const Review = require("../models/review")
const catchAsync = require("../utils/catchAsync")
const { deleteOne, updateOne } = require("./factories")

// exports.updateReview = async function (req, res) {
//     try {
//         // create review
//         const newReview = await Review.findOneAndUpdate(
//             { tour: req.params.tId, user: req.user._id, _id: req.params.rId },
//             {...req.body, user: req.user._id},
//             {new: true}
//             )
//         res.status(202).json({ status: "success", data: newReview })
//     } catch (error) {
//         res.status(400).json({ status: "fail", message: error.message });
//     }
// }

exports.updateReview = updateOne(Review)

exports.readReviews = catchAsync(async function (req, res) {
    const reviews = await Review.find({ tour: req.params.tId })
    return res.status(200).json({ status: "ok", data: reviews })

})

exports.readSingleReview = catchAsync(async function (req, res) {
    const review = await Review.findOne({ tour: req.params.tId, user: req.user._id, _id: req.params.rId })
    return res.status(200).json({ status: "ok", data: review })

})

exports.createReview = catchAsync(async function (req, res) {

    const review = await Review.findOneAndUpdate(
        { user: req.user._id, tour: req.params.tId },
        { ...req.body, user: req.user._id },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    return res.status(201).json({ status: "success", data: review })

})

// exports.delelteReview = async function (req, res) {
//     try {
//         await Review.findOneAndDelete({ tour: req.params.tId, user: req.user._id, _id: req.params.rId },)
//         res.status(204).json({ status: "success", data: null })
//     } catch (error) {
//         res.status(400).json({ status: "fail", message: error.message });
//     }
// }

exports.delelteReview = deleteOne(Review)