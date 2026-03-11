import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    regNo:Number,
    password:String,
    role:{
        type:String,
        enum:['student','faculty','admin']
    }
})

const User=mongoose.model('user',userSchema)

export default User;