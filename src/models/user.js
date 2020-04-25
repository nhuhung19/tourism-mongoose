const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
        Lowercase: true,
        validate: {
            validator: function (value){
                return validator.isEmail(value)
            }
        }
    },
    password: {
        type: String,
        required: [true, "password is requied"]
    },
    tokens: [String]
})

userSchema.statics.loginWithCredentials = async function(email, password){
    const user = await User.findOne({email: email})
    console.log(user)
    if(!user) throw new Error("User not found")

    const allow = await bcrypt.compare(password.toString(), user.password)
    if(!allow) throw new Error("not Authenticated")
    return user
}

userSchema.methods.generateToken = async function (){
    const token = jwt.sign({ email: this.email,id: this._id}, process.env.SECRET, { expiresIn: '7d' })

    this.tokens.push(token)
    await this.save()
    return token
}

userSchema.methods.toJSON = function (){
    console.log(this)
    let newObj = this.toObject() //to use public key of "this"
    delete newObj.password
    delete newObj.__v
    return newObj
}

userSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash( this.password, saltRounds)
        // Store hash in your password DB.);
    next()
})


const User = mongoose.model("User", userSchema)

module.exports = User