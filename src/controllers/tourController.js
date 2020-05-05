const Tour = require("../models/tour")
const Category = require("../models/category")
const { deleteOne, updateOne } = require("./factories")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
exports.createTour = catchAsync(async function (req, res, next) {
    // try{

    const tour = await Tour.create({ ...req.body, organizer: req.user._id })
    return res.status(201).json({ status: "ok", data: tour })

    // }catch (err){
    //     next(new AppError(400, err.message))
    //     // return res.status(400).json({status: "fail", error: err.message})
    // }
})

exports.updateTour = updateOne(Tour)

// exports.updateTour = async function (req, res){
//     try{
//         const newTour = await Tour.findOneAndUpdate(
//             {organizer: req.user._id, _id: req.params.id}, 
//             {...req.body}, 
//             {new: true}
//             )
//         return res.status(202).json({status: "success", data: newTour})
//     } catch (err){
//         return res.status(400).json({status: "fail", error: err.message})
//     }
// }

// exports.deleteTour = async function (req, res){
//     try{
//          await Tour.findOneAndDelete({organizer: req.user._id, _id: req.params.id})
//         return res.status(204).json({status: "success", data: null})
//     } catch (err){
//         return res.status(400).json({status: "fail", error: err.message})
//     }
// }

exports.deleteTour = deleteOne(Tour)

exports.readTour = catchAsync(async function (req, res, next) {
    const filters = { ...req.query };
    const paginationKeys = ["limit", "page", "sort"];
    paginationKeys.map(el => delete filters[el])
    console.log(filters)
    // building query
    let query = Tour.find(filters);
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ")
        console.log(sortBy)
        query.sort(sortBy)

    };
    console.log(query)
    if (!req.query.sort) {
        query = query.sort("-createdAt")
    }
    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const countTours =  await Tour.find(filters).countDocuments()
    if (req.query.page && skip > countTours){
      return next(new AppError(400, "Page number out of range"))
    }
    // execute query
    const tours = await query;
    // const tours = await Tour.find(filters)
    return res.status(200).json({ status: "ok", data: tours, countTours: countTours })
})

exports.readSingleTour = catchAsync(async function (req, res) {
    const tour = await Tour.findById({ _id: req.params.id })
    if (!tour) return res.status(404).json({ status: "fail", error: "tour not found" })
    return res.status(200).json({ status: "ok", data: tour })
})

exports.readByCategory = catchAsync(async function (req, res) {
    const tour = await Category.findById(req.category._id).populate("tours")
    // console.log(tour)
    return res.status(200).json({ status: "ok", data: tour })
})