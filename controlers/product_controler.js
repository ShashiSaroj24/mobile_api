import { product_model } from "../models/product_model.js";
export const addproduct = async( req, resp)=>{
    const {title, description, image,qty,price,category}= req.body;
    try{
        let product_data= await new product_model({title, description, image,qty,price,category});
        const x= await product_data.save()
      
            
        resp.json({msg:"product successfully added"})
       
    }
    catch(err){
        resp.json({msg:err})
    }
    }
    export const getproductById = async(req,resp)=>{
        const id = req.params.id
        let product =await product_model.findById(id)
        if (!product){
            return resp.json({msg:"invalid id"})
        }
        resp.json({msg:'specific product',product})
    }
    export const updateproductById = async(req,resp)=>{
        const id = req.params.id
        let product =await product_model.findByIdAndUpdate(id,req.body,{new:true})
        if (!product){
            return resp.json({msg:"invalid id"})
        }
        resp.json({msg:'your product has been updated',product})
    }
    export const searchproductById = async(req,resp)=>{
        const x= req.params.title
        console.log(x)
        let product =await product_model.find({title:x})
        console.log(product)
        if (!product){
            return resp.json({msg:"invalid id"})
        }
        resp.json({msg:'your product has been search',product})
    }
    export const deleteproductById = async(req,resp)=>{
        const id = req.params.id
        let product =await product_model.findByIdAndDelete(id)
        if (!product){
            return resp.json({msg:"invalid id"})
        }
        resp.json({msg:'your product has been delete',product})
    }

    export const allproduct = async(req,resp)=>{
        try{
            const alldata =await product_model.find()
            resp.json({msg:"all product",alldata})
        }
        catch(err){
            resp.json({msg:"err"})
        }
    }
