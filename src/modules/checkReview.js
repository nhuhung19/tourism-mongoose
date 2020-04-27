const Review = require("../models/review")

async function checkReview (req, res, next){
    try{
        const review = await Review.findById(req.params.id)
        if(!review) throw new Error("Review not exist")
        req.review = review

    }catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}

module.exports = checkReview