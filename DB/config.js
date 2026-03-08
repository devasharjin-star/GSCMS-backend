import mongoose from "mongoose";

const connectToDb=async()=>{
    try{
        const conneectDb=await mongoose.connect(process.env.MONGO_URI)
        if(conneectDb){
            console.log("DB connnected")
        }
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}

export default connectToDb;