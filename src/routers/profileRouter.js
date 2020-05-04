const router = require("express").Router()
const {auth} = require("../controllers/authController")
const {createProfile, updateProfile} = require("../controllers/profileController")
// const { changePassword} = require("../controllers/userControllers")



router.route("/")
.post(auth, createProfile)
.put(auth, updateProfile)
// router.route("/password")
// .put(auth, changePassword)

module.exports = router