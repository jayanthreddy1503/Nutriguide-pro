# NutriGuide Pro — Fix & Feature Summary

## How to run
```
npm install
npm run dev      # or: npm start
```
Your `.env` already has `MONGO_URI` and `JWT_SECRET`. The app boots, serves `public/`,
and connects to MongoDB Atlas (needs internet + your IP whitelisted on Atlas).

---

## 1. AI feature for identifying food / calories ✅ (new)
**Calorie Calculator** page now has an **"AI Food Identifier"** box. Type a plain
description like *"2 boiled eggs and a bowl of rice"* and it adds the matching
items with calories/protein/carbs/fat straight into your food log.

- Backend: `POST /api/ai/identify-food` (`controllers/aiController.js`, `routes/aiRoutes.js`)
- If you set `ANTHROPIC_API_KEY` in `.env`, it uses the real Claude API to read any
  free-text food description and estimate nutrition.
- **Works out of the box even without a key** — it falls back to a local fuzzy-matching
  engine (`data/foodDB.js`) that parses quantities ("2 eggs", "150g chicken") and matches
  against a nutrition database. Tested both paths.

## 2. Weekly diet plan by gender — replaces the old flat food list ✅
**Recommendations** page (linked from the Dashboard) no longer shows a single generic
"Recommended Foods" list. It now shows a full **7-day diet plan** (Mon–Sun tabs) with
Breakfast/Lunch/Snack/Dinner for each day — built specifically for the user's **gender**
(from their profile) and their **goal** (Weight Loss / Gain / Maintain), with different
calorie targets for Male vs Female. Click any day tab to see that day's meals.

## 3. Login & Register — found and fixed the real bug
**The biggest issue:** your backend (Express + MongoDB + JWT + bcrypt) was fully built
and correct, but the frontend `login.js` / `register.js` never called it — they only
used `localStorage` as fake auth. So accounts didn't really exist anywhere, nothing
worked across browsers/devices, and the backend code was dead.

Fixed:
- `login.js` / `register.js` now call the real `POST /api/auth/login` and
  `POST /api/auth/register` endpoints.
- Added `middleware/authMiddleware.js` (JWT verification) and protected
  `/api/profile/*` and `/api/ai/*` routes with it.
- `profile.js` now saves/loads the profile from MongoDB per logged-in user (was
  also localStorage-only before — anyone's profile could overwrite anyone else's
  via the old `Profile.findOne()` with no user filter).
- Added input validation (email format, password length, duplicate-email handling)
  and clear error messages on both register and login, front and back end.
- `shared.js` now guards every inner page — if you're not logged in, you're sent
  back to `login.html` automatically.
- Fixed `package.json`'s invalid `"type": "common.js"` → `"commonjs"`.

**Login page stats, now real:**
- Added `GET /api/auth/stats`, returning the **actual count of registered users**.
- Login/Register pages fetch this on load — the "Users" number now genuinely goes
  up the moment a new person registers, instead of being a hardcoded "10K+".

## 4. Full feature pass
Checked every page's JS against its HTML (no missing element IDs, no syntax errors —
verified with `node --check` on all 24 JS files and HTML parsing on all 15 pages).
Confirmed working: BMI calculator, Water tracker, Health Score, Progress tracker +
chart, Nutrition deficiency lookup, Recipes, Exercise library — these were already
solid and self-contained, so left as-is. Dashboard now refreshes the profile from
the database on load instead of stale local cache.

## Notes
- Water intake / weight-log history / daily calorie log are intentionally still
  local-only (no backend models existed for them) — say the word if you'd like
  those moved to MongoDB too, per-user, like profile/auth now are.
- Your `.env` has live MongoDB Atlas credentials — since this is your own project
  I left them in place, but consider rotating that password if this zip is ever shared.
