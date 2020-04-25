const Category = require("../models/category")


async function checkCategory (req, res, next){
    try{
        const category = await Category.findById(req.params.id)
        if(!category) throw new Error("Category not exist")
        req.category = category
    } catch (err){
        return res.status(400).json({status: "fail", error: err.message})
    }
    next()
}

module.exports = checkCategory