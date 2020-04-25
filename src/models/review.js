const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Review must have user"]
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: "Tour",
        required: [true, "Review must have tour"]
    },
    content: {
        type: String,
        required: [true, "content is required"]
    },
    rating: {
        type: Number,
        required: [true, "Review needs a rating"],
        min: 1,
        max: 5
      }
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review