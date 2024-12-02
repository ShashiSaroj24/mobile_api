import { user_model } from "../models/user_model.js";
import bcryptjs from'bcryptjs'
import jwt from 'jsonwebtoken'
export const register = async( req, resp)=>{
    const {name, email, password}= req.body;
    try{
         const da=await user_model.findOne({email})
         if (da){
            resp.json({msg:'email is already exist', success:false})
         }
         else{
        const pw= await bcryptjs.hash(password,10)
        let user_data= await new user_model({name,email,password:pw});
        const x= await user_data.save()
      
            
        resp.json({msg:"user successfully added", success:true})
       
    }}
    catch(err){
        resp.json({msg:err, success:false})
    }
}
export const allusers = async(req,resp)=>{
    try{
        const alldata =await user_model.find()
        resp.json({msg:"all users",alldata})
    }
    catch(err){
        resp.json({msg:"err"})
    }
}
export const profile = async(req,res)=> {
    res.json({user:req.user})
}



export const login = async(req,resp)=>{
    const{email,password}=req.body;
    try{
        const user= await user_model.findOne({email})
        if(!user){
            resp.json({msg:"invalid user"})
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if((!validPassword)){
            resp.json({msg:"invalid candidate"})
        
            
        }
        const token= jwt.sign({userId:user._id},"!ruby()",{
            expiresIn:'365d'
        })
        resp.json({msg:`welcome ${user.name}`, token, success:true})
    }
    catch(err){
    resp.json({msg:"err", success:false})
}
}



