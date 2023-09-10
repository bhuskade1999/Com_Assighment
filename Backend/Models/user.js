const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken")


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Name"]
    }, 

    number:{
        type:String,
        required:[true, "Please Enter Number"],
        unique:[true,"Number Already Exists"],
    },

    
    email:{
        type:String,
        unique:[true,"Email Already Exists"],
        required:[true, "Please Enter Email"]
    },

    password:{
        type:String,
        required:[true, "Please Enter Password"],
    },

})


//before saving do hash password
UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
     this.password = await bcrypt.hash(this.password ,10)
    }
    next();
})


UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


UserSchema.methods.generateToken = function(){
   return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
    
}


module.exports = mongoose.model('User', UserSchema);