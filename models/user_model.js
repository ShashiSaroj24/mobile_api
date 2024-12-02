import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    createdAT:{type:Date,default:Date.now}
})

export const user_model =mongoose.model("user",userSchema)