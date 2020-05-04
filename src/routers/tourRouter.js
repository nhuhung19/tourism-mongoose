
const router = require("express").Router()
const {createTour, readTour, readSingleTour, updateTour, deleteTour, readByCategory} = require("../controllers/tourController")
const {auth} = require("../controllers/authController")
const checkCategory = require("../modules/checkCategory")

router.route("/")
.get(auth, readTour)
.post(auth, createTour)
router.route("/:id")
.put(auth, updateTour)
.delete(auth, deleteTour)
.get(auth, readSingleTour)
router.route("/categorys/:id")
.get(auth, checkCategory, readByCategory)

module.exports = router