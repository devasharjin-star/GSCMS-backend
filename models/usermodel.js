import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    regNo:Number,
    password:String
})

const User=mongoose.model('user',userSchema)

export default User;