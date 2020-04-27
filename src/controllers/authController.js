const User = require("../models/user")
const jwt = require('jsonwebtoken')

exports.login = async function(req, res){
    try{
        const {email, password} = req.body
        if(!email && !password) throw new Error("Email & password is required")
        const user = await User.loginWithCredentials(email, password)
        const jsonToken = await user.generateToken()
        return res.status(200).json({status: "ok", data: jsonToken})
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}

exports.auth = async function(req, res, next){
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const token = req.headers.authorization.replace("Bearer ", "");

    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({_id: decoded.id, tokens:token})
        if(!user) throw new Error("Unauthorized")
        req.user = user
        
    } catch(err){
        return res.status(400).json({status: "fail", error: err.message})
    }
    next()
}

exports.logout = async function(req, res){
    try{
        const token = req.headers.authorization.replace("Bearer ", "");
        const user = req.user
        user.tokens = user.tokens.filter(el => el !== token)
        await user.save()
        return res.status(204).json({status: "success", data: null})
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}

exports.logoutAll = async function (req, res){
    try{
        const user = req.user
        user.tokens = []
        await user.save()
        return res.status(204).json({status: "success", data: null})
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
}