const Profile = require("../models/profile")


exports.updateProfile = async function(req, res){
    const {address, phone, introduce} = req.body
    try{
        console.log(req.user._id)
        const newProfile = await Profile.findOneAndUpdate({user:req.user._id}, { introduce, address, phone }, {new: true})
        return res.status(202).json({status: "ok", data: newProfile})
    } catch (err){
        return res.status(400).json({stauts: "fail", error: err.message})
    }
}

exports.createProfile = async function(req,res){
    const {address, phone, introduce} = req.body
    try{
        const profile = await Profile.create({introduce,address, phone, user: req.user._id})
        return res.status(201).json({stauts: "ok", data: profile})
    } catch (err){
        return res.status(400).json({stauts: "fail", error: err.message})
    }
}