const router = require("express").Router({mergeParams: true})
const {auth} = require("../controllers/authController")
const {createReview, updateReview, readReviews, delelteReview, readSingleReview} = require("../controllers/reviewController")
const checkTour = require("../modules/checkTour")
const checkReview = require("../modules/checkReview")


// the subsequen
router.route("/")
.get(auth,checkTour, readReviews)
.post(auth, checkTour, createReview)
router.route("/:id")
.get(auth, checkTour, checkReview, readSingleReview)
.put(auth, checkTour, checkReview, updateReview)
.delete(auth, checkTour, checkReview, delelteReview)

module.exports = router