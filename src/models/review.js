const mongoose = require("mongoose")
const AppError = require("../utils/appError")

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

// calculate rating and save to DB
reviewSchema.statics.calculateAveRating = async function (tourId){
    // find all the reviews that have the tour: tourId
    // generate a new obj with {
   //     _id :tourId,
   //      ratingQ: number of docs found
   //       ratingA: average of field rating in all found docs
    // }
    const stats = await this.aggregate([
        {$match: {tour: tourId}}, // exp: found 5 doc
        {$group: {
            _id: "$tour", // tour is value is tour in $match
            ratingQuantity: {$sum: 1}, //5
            ratingAverage: {$avg: "$rating"} // choose the field on the doc
        }}
    ])
    // stats will return [{_id, ratingAverage, ratingQuantity}]
    
    //save the data above to our database

    await mongoose.model("Tour").findByIdAndUpdate(tourId, {
        ratingAverage: stats.length === 0 ? 0 : stats[0].ratingAverage,
        ratingQuantity: stats.length === 0 ? 0 : stats[0].ratingQuantity
    })
}

// gonna use Doc middleware
reviewSchema.post("save",async function(){
    //this = doc (instance)
   await this.constructor.calculateAveRating(this.tour)
})

reviewSchema.pre(/^findOneAnd/,async function(next){
    // this = query
    // we dont have Review model yet
    // create doc and attach the review doc to the query itsefl
    this.doc = await this.findOne()
    if (!this.doc) return next(new AppError(404,"Review not found"))
    // console.log(this.doc, "query middleware")
    next()
})


reviewSchema.post(/^findOneAnd/,async function(){
    // "this" is also the query
    // this.doc now is the same as "this" inside reviewSchema
    await this.doc.constructor.calculateAveRating(this.doc.tour)
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review