import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    image:{type:String,require:true},
    qty:{type:Number,require:true},
    price:{type:Number,require:true},
    category:{type:String,require:true},
    createdAT:{type:Date,default:Date.now}
})

export const product_model =mongoose.model("product",productSchema)