const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    goal: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Profile",
    profileSchema
);