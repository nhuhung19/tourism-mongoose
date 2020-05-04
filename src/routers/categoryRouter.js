const router = require("express").Router()
const {auth} = require("../controllers/authController")
const {createCategory, readCategory, updateCategory, deleteCategory } = require("../controllers/categoryController")


router.route("/")
.post(auth, createCategory)
.get(auth, readCategory)
router.route("/:id")
.put(auth, updateCategory)
.delete(auth, deleteCategory)

module.exports = router
