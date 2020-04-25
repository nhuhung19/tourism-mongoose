const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "category is required"],
        trim: true,
        unique: true
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

categorySchema.virtual('tours', {
    ref: 'Tour', 
    localField: '_id', 
    foreignField: 'categorys',
});

const Category = mongoose.model("Category", categorySchema)

module.exports = Category