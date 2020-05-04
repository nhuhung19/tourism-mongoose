const express = require("express")
require("dotenv").config()
const app = express()
const mongoose = require("mongoose")
const router = express.Router()
const bodyParser = require("body-parser")
const tourRouter = require("./src/routers/tourRouter")
const reviewRouter = require("./src/routers/reviewRouter")
const userRouter = require("./src/routers/userRouter")
const authRouter = require("./src/routers/authRouter")
const categoryRouter = require("./src/routers/categoryRouter")
const profileRouter = require("./src/routers/profileRouter")


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


// user router
router.use("/users", userRouter)
// auth router
router.use("/auth", authRouter)
//tour Router
router.use("/tours", tourRouter)
// review Router
router.use("/tours/:tId/reviews", reviewRouter)
// category Router
router.use("/categorys", categoryRouter)
// profile Router
router.use("/profile", profileRouter)

const AppError = require("./src/utils/appError")

function notFound(req, res, next) {
    next(new AppError(404, "API NOT FOUND"))
}

router.route("*").all(notFound)
const errorHandler = require("./src/utils/errorHandler")
//create a error handler that will capture all error
app.use(errorHandler) // last middleware run

app.listen(process.env.PORT, ()=> {
    console.log("App is running")
})