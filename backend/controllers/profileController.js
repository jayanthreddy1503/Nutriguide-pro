const Profile = require("../models/profile");

// Create or update the logged-in user's profile (one profile per user)
exports.saveProfile = async (req, res) => {

    try {

        const { name, age, gender, height, weight, goal } = req.body;

        if (!name || !age || !gender || !height || !weight || !goal) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all profile fields."
            });
        }

        const profile = await Profile.findOneAndUpdate(
            { user: req.user._id },
            { user: req.user._id, name, age, gender, height, weight, goal },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(201).json({
            success: true,
            message: "Profile saved successfully.",
            profile
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get the logged-in user's own profile only
exports.getProfile = async (req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.user._id });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "No profile found yet."
            });
        }

        res.status(200).json({
            success: true,
            profile
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
