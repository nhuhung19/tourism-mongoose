const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

exports.deleteOne = Model =>catchAsync( async function (req, res) {
    // try {
        // console.log(Model.modelName)
        let id
        switch (Model.modelName) {
            case "Tour":
                id = req.params.id
                break;
            case "Review":
                id = req.params.id
                break;
            default:
                id = req.params.id
        }
        // if(!id){
        //     next(new AppError(400, "Incorrect Input"))
        // }

        await Model.findOneAndDelete({ _id: id })
        res.status(204).end()
    // } catch (err) {
    //     res.status(400).json({ status: "fail", message: err.message });
    // }
})

exports.updateOne = Model =>catchAsync(async function (req, res) {
    // try {
        // console.log(Model.modelName)
        let allows = []
        let id = req.params.id
        switch (Model.modelName) {
            case "Tour":
                allows = ["title", "description", "guides", "duration", "price"]
                id = req.params.id
                break;
            case "Review":
                allows = ["content", "rating"]
                id = req.params.id
                break;
            case "User":
                allows = ["password"]
                id = req.user._id
                break;
            default:
                allows = []
                id = req.params.id
        }
        // req.body
        // Object.keys(req.body) // return array of fields inside req.body
        Object.keys(req.body).forEach(el => {
            if(!allows.includes(el))
            delete req.body[el]
        })
        // console.log(req.body)

        const newItem = await Model.findOneAndUpdate({_id: id}, req.body, {new: true})
        res.status(202).json({status: "ok", data: newItem})
    // } catch (err) {
    //     res.status(400).json({ status: "fail", message: err.message });
    // }
})
