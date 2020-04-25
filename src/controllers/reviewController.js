const Review = require("../models/review")

exports.updateReview = async function (req, res) {
    try {
        // create review
        const newReview = await Review.findOneAndUpdate(
            { tour: req.body.tour, user: req.user._id, _id: req.params.rId },
            {...req.body, user: req.user._id},
            {new: true}
            )
        res.status(202).json({ status: "success", data: newReview })
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
}

exports.readReviews = async function (req, res){
    try{
        const reviews = await Review.find({tour: req.body.tour})
        return res.status(200).json({ status: "ok", data: reviews })
    } catch (err){
        res.status(400).json({ status: "fail", message: error.message });
    }
}

exports.readSingleReview = async function (req, res){
    try{
        const review = await Review.findOne({tour: req.body.tour, user: req.user._id, _id: req.params.rId})
        return res.status(200).json({ status: "ok", data: review })
    } catch (err){
        res.status(400).json({ status: "fail", message: error.message });
    }
}

exports.createReview = async function (req, res) {
    try {
        const review = await Review.findOneAndUpdate(
            { user: req.user._id, tour: req.body.tour },
            { ...req.body, user: req.user._id },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
        return res.status(201).json({ status: "success", data: review })
    } catch (err) {
        res.status(400).json({ status: "fail", message: error.message });
    }
}

exports.delelteReview = async function (req, res) {
    try {
        await Review.findOneAndDelete({ tour: req.body.tour, user: req.user._id, _id: req.params.rId },)
        res.status(204).json({ status: "success", data: null })
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
}