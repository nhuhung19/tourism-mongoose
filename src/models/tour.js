const mongoose = require("mongoose")
const User = require("./user")
const Review = require("../models/review")

const tourSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"],
        minLength: 10
    },
    organizer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Tour must have an organizer"]
    },
    guides: [{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Tour must have guides"]
    }],
    duration: {
        type: Number,
        required: [true, "Tour must have a duration"],
    },
    price: {
        type: Number,
        required: [true, "Tour must have a price"],
        min: 0
    },
    categorys: [{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Tour must have category"]
    }],
    ratingAverage: {
        type: Number,
        default: 0,
        min: [0, "Rating must be above 0"],
        max: [5, "Rating must be below 5.0"],
        set: value => Math.round(value * 10) / 10
    },
    ratingQuantity: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })



tourSchema.pre(/^find/, function (next) {
    this
        .populate("organizer", "-password -__v -tokens -createdAt -updatedAt")
        .populate("guides", "_id name")
        .populate("categorys", "_id category")
    next()
})

tourSchema.pre("save", async function (next) {
    if (!this.isModified("guides")) return next();

    const found = await User.find({ "_id": { $in: this.guides } }).select("_id");
    // console.log(found)
    if (found.length !== this.guides.length)
        throw new Error("guide(s) doesn't exist");
    next();
});

tourSchema.post("findOneAndDelete", async function () {
    await Review.deleteMany({ tour: this._conditions._id })
})

const Tour = mongoose.model("Tour", tourSchema)

module.exports = Tour
