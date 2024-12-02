import { contact_model } from "../models/contact_model.js";
export const contact = async( req, resp)=>{
    const {name,email,phone,message}= req.body;
    try{
        let contact_data= await new contact_model({name,email,phone,message});
        const x= await contact_data.save()
      
            
        resp.json({msg:" successfully added"})
       
    }
    catch(err){
        resp.json({msg:err})
    }
    }