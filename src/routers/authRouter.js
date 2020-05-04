const router = require("express").Router()

const {login, auth, logout, logoutAll} = require("../controllers/authController")

router.route("/login")
.post(login)
router.route("/logout")
.get(auth, logout)
router.route("/logoutAll")
.get(auth, logoutAll)

module.exports = router
