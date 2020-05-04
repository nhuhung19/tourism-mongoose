const mongoose = require("mongoose")
const User = require("./user")

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
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    categorys: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category"
        }
    ]
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })
    


tourSchema.pre(/^find/, function (next){
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

const Tour = mongoose.model("Tour", tourSchema)

module.exports = Tour
