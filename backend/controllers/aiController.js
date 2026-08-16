const foodDB = require("../data/foodDB");

// Build a flat lookup of synonym -> food key, longest synonyms first so
// "whole wheat bread" matches before the shorter "bread".
const synonymEntries = [];
Object.entries(foodDB).forEach(([key, food]) => {
    food.synonyms.forEach((syn) => synonymEntries.push({ syn, key }));
});
synonymEntries.sort((a, b) => b.syn.length - a.syn.length);

// Very small free-text quantity parser: looks for a number immediately
// preceding a matched food name (e.g. "2 eggs", "150g rice", "a bowl of rice").
function extractQuantity(text, syn, matchIndex) {
    const before = text.slice(0, matchIndex);
    const numberMatch = before.match(/(\d+(?:\.\d+)?)\s*(g|grams|gm)?\s*$/i);
    if (numberMatch) {
        const num = parseFloat(numberMatch[1]);
        const unit = numberMatch[2];
        if (unit) return num; // already in grams
        return null; // count of items (e.g. "2 eggs") — handled by caller
    }
    return null;
}

function localIdentify(description) {
    const text = description.toLowerCase();
    const found = [];
    const usedRanges = [];

    for (const { syn, key } of synonymEntries) {
        let searchFrom = 0;
        let idx;
        while ((idx = text.indexOf(syn, searchFrom)) !== -1) {
            const overlaps = usedRanges.some(
                (r) => idx < r.end && idx + syn.length > r.start
            );
            searchFrom = idx + syn.length;
            if (overlaps) continue;

            usedRanges.push({ start: idx, end: idx + syn.length });

            const food = foodDB[key];
            const grams = extractQuantity(text, syn, idx);

            // Count words like "2 eggs" multiply default portion
            const countMatch = text
                .slice(0, idx)
                .match(/(\d+)\s*$/);
            const count = countMatch ? parseInt(countMatch[1], 10) : 1;

            const weight = grams || food.defaultGrams * count;
            const factor = weight / 100;

            found.push({
                name: food.label,
                estimatedWeightGrams: Math.round(weight),
                calories: +(food.cal * factor).toFixed(1),
                protein: +(food.protein * factor).toFixed(1),
                carbs: +(food.carbs * factor).toFixed(1),
                fat: +(food.fat * factor).toFixed(1),
            });
        }
    }

    return found;
}

async function aiIdentify(description) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return null;

    const systemPrompt = `You identify food items from a free-text description and estimate their nutrition.
Respond ONLY with a JSON array (no markdown, no commentary) of objects shaped exactly like:
[{"name": string, "estimatedWeightGrams": number, "calories": number, "protein": number, "carbs": number, "fat": number}]
Use your best nutritional knowledge for standard serving sizes when the user doesn't specify a quantity.
If nothing resembling food is found, respond with [].`;

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-6",
                max_tokens: 1000,
                system: systemPrompt,
                messages: [
                    { role: "user", content: description }
                ]
            })
        });

        if (!response.ok) {
            console.log("Anthropic API error:", response.status, await response.text());
            return null;
        }

        const data = await response.json();
        const textBlock = (data.content || [])
            .filter((b) => b.type === "text")
            .map((b) => b.text)
            .join("");

        const cleaned = textBlock.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);

        if (!Array.isArray(parsed)) return null;
        return parsed;

    } catch (error) {
        console.log("AI food identification failed, falling back to local DB:", error.message);
        return null;
    }
}

exports.identifyFood = async (req, res) => {
    try {
        const description = (req.body.description || "").trim();

        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Please describe what you ate, e.g. '2 boiled eggs and a bowl of rice'."
            });
        }

        let items = await aiIdentify(description);
        let source = "ai";

        if (!items) {
            items = localIdentify(description);
            source = "local";
        }

        if (!items.length) {
            return res.status(404).json({
                success: false,
                message: "Couldn't recognize any food in that description. Try naming foods more clearly, e.g. '1 cup rice, 100g chicken breast'."
            });
        }

        res.status(200).json({
            success: true,
            source,
            items
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "AI food identification failed. Please try again."
        });
    }
};
