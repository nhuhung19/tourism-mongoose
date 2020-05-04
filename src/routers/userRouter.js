const router = require("express").Router()
const {auth} = require("../controllers/authController")
const {createUser, updateUser, changePassword} = require("../controllers/userControllers")


router.route("/")
.post(createUser)
.put(auth, updateUser)


module.exports = router
