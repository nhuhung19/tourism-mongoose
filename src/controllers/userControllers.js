const User = require("../models/user")
const {updateOne} = require("./factories")
const catchAsync = require("../utils/catchAsync")
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUser = catchAsync(async function (req, res) {
    const { name, email, password } = req.body
        const user = await User.create({ name, email, password })
        return res.status(201).json({ status: "ok", data: user })
})

exports.updateUser = updateOne(User)

// exports.changePassword = async function (req, res) {
//     let { currentPassword, newPassword, confirmPassword } = req.body
//     // console.log(typeof newPassword)
//     try {
//         const allow = await bcrypt.compare(currentPassword.toString(), req.user.password)
//         if(newPassword !== confirmPassword)  throw new Error("password not match")
//         if (!allow) throw new Error("Password not correct")
//         if (allow && newPassword === confirmPassword) {
//             newPassword = await bcrypt.hash(newPassword.toString(), saltRounds)
//             await User.findOneAndUpdate({_id: req.user._id}, { password: newPassword }, { new: true })
//             return res.status(202).json({ status: "success", message: "change password success" })
//         }
//     } catch (err) {
//         return res.status(400).json({ status: "ok", error: err.message })
//     }
// }