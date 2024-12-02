import mongoose from "mongoose";
const cartItemSchema = new  mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product_model",
        require:true,

    },
    title:{type:String, require:true},
    price:{type:Number, require:true},
    qty:{type:Number, require:true},
    img:{type:String, require:true},
    

});
const cartSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_model",
        require:true,
    },
    items:[cartItemSchema]
})
export const cart_model =mongoose.model('cart',cartSchema)