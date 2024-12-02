import jwt from "jsonwebtoken"
import { user_model} from "../models/user_model.js";

export const Authenticated = async ( req,res, next) => {
    const token = req.header("auth");

    if (!token) return res.json({message:"login first"});
    const decoded = jwt.verify(token,"!ruby()");
    const id = decoded.userId;
    let user = await user_model.findById(id);
    if (!user) return res.json({message:"user not exist "});
    req.user = user;
    next();

}