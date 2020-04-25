const Category = require("../models/category")

exports.createCategory = async function (req, res){
    try{
        const category = await Category.create({category: req.body.category})
        return res.status(201).json({status: "success", data: category})
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}

exports.readCategory = async function (req, res){
    try{
        const categorys = await Category.find({})
        return res.status(200).json({status: "success", data: categorys})
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}


exports.updateCategory = async function (req, res){
    try{
        const newCategory = await Category.findByIdAndUpdate(req.params.id, {category: req.body.category}, {new: true})
        return res.status(202).json({status: "success", data: newCategory})
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}


exports.deleteCategory = async function (req, res){
    try{
        await Category.findByIdAndDelete(req.params.id)
        return res.status(202).json({status: "success", data: null})
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}