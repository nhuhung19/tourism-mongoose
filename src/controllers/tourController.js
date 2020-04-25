const Tour = require("../models/tour")
const Category = require("../models/category")

exports.createTour = async function (req, res){
    try{
        const tour = await Tour.create({...req.body, organizer: req.user._id})
        return res.status(201).json({status: "ok", data: tour})

    }catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}

exports.updateTour = async function (req, res){
    try{
        const newTour = await Tour.findOneAndUpdate({organizer: req.user._id, _id: req.params.id}, {...req.body}, {new: true})
        return res.status(202).json({status: "success", data: newTour})
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}

exports.updateTour = async function (req, res){
    try{
        const newTour = await Tour.findOneAndUpdate(
            {organizer: req.user._id, _id: req.params.id}, 
            {...req.body}, 
            {new: true}
            )
        return res.status(202).json({status: "success", data: newTour})
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}

exports.deleteTour = async function (req, res){
    try{
         await Tour.findOneAndDelete({organizer: req.user._id, _id: req.params.id})
        return res.status(204).json({status: "success", data: null})
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}

exports.readTour = async function (req, res){
    try{
        const tours = await Tour.find({})
        return res.status(200).json({status: "ok", data: tours})
    } catch (err){
        return res.status(404).json({status: "fail", error: err.message })
    }
}

exports.readSingleTour = async function (req, res){
    try{
        const tour = await Tour.findById({_id: req.params.id})
        
        if(!tour) return res.status(404).json({status: "fail", error: "tour not found"})
        return res.status(200).json({status: "ok", data: tour})
    } catch (err){
        return res.status(404).json({status: "fail", error: err.message })
    }
}

exports.readByCategory = async function (req, res){

    try{
        const tour = await Category.findById(req.category._id).populate("tours")
        console.log(tour)
        return res.status(200).json({status: "ok", data: tour})
    }catch (err){
        // console.log(err)
        return res.status(404).json({status: "fail", error: err.message })
    }
}