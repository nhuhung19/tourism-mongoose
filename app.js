const express = require("express")
require("dotenv").config()
const app = express()
const mongoose = require("mongoose")
const router = express.Router()
const bodyParser = require("body-parser")
const {login, auth, logout} = require("./src/controllers/authController")
const {createUser} = require("./src/controllers/userControllers")
const {createProfile, updateProfile} = require("./src/controllers/profileController")
const {createTour, readTour, readSingleTour, updateTour, deleteTour, readByCategory} = require("./src/controllers/tourController")
const {createCategory, readCategory, updateCategory, deleteCategory } = require("./src/controllers/categoryController")
const checkTour = require("./src/modules/checkTour")
const checkCategory = require("./src/modules/checkCategory")
const {createReview, updateReview, readReviews, delelteReview, readSingleReview} = require("./src/controllers/reviewController")
mongoose.connect(process.env.DB_LOCAL, {
    // some options to deal with deprecated warning, you don't have to worry about them.
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("successfully connected to database")).catch(error => console.log(error))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok", data: [] })
})

router.route("/users")
.post(createUser)

router.route("/auth/login")
.post(login)

router.route("/auth/logout")
.get(auth, logout)

router.route("/profile")
.post(auth, createProfile)
.put(auth, updateProfile)

router.route("/categorys")
.post(auth, createCategory)
.get(auth, readCategory)
router.route("/categorys/:id")
.put(auth, updateCategory)
.delete(auth, deleteCategory)

router.route("/tours")
.get(auth, readTour)
.post(auth, createTour)
router.route("/tours/:id")
.put(auth, updateTour)
.delete(auth, deleteTour)
router.route("/tours/:id")
.get(auth, readSingleTour)

router.route("/tours/categorys/:id")
.get(auth, checkCategory, readByCategory)

router.route("/reviews")
.get(auth,checkTour, readReviews)
.post(auth, checkTour, createReview)
router.route("/reviews/:rId")
.get(auth, checkTour,readSingleReview)
.put(auth, checkTour, updateReview)
.delete(auth, checkTour, delelteReview)


app.listen(process.env.PORT, ()=> {
    console.log("App is running")
})