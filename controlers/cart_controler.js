import { cart_model } from "../models/cart_model.js";

export const addToCart = async(req, resp)=>{
    const {productId, title , price , qty, img} = req.body;
   // const userId ="66c6d88c58505dd29e9f2c22";
   const userId = req.user;
    let cart_data = await cart_model.findOne({userId})
    if (!cart_data){
        cart_data = new cart_model({ userId, items:[]})   
    }
    const itemIndex =cart_data.items.findIndex(
        

        // (item) => item.productId.toString() === productId

        // (item) => item.productId.toString() === productId
        (item) => item?.productId?.toString() === productId


    )

    if (itemIndex > -1){
        cart_data.items[itemIndex].qty +=qty;
        cart_data.items[itemIndex].price +=price*qty;

    }
    else{
 
    cart_data.items.push({productId, title, price, qty,img});
    }
    await cart_data.save()
    resp.json({msg:"item add to cart", cart_data})
}



export const getcartById = async(req,resp)=>{
   // const userId ="66c6d88c58505dd29e9f2c22";
    const userId = req.user;
    let cart = await cart_model.findOne({userId})
    if (!cart){
        return resp.json({msg:"not found"})
    }
    resp.json({msg:'specific cart found',cart})
}


export const deletecartById = async(req,resp)=>{
   // const userId ="66c6d88c58505dd29e9f2c22";
    const userId = req.user;
    const productId =req.params.productId
    let cart = await cart_model.findOne({userId})
    if (!cart){
        return resp.json({msg:"not found"})
    }
    cart.items=cart.items.filter(
                (item)=> item.productId.toString()   !== productId
            )
            cart.save()
            resp.json({msg:'your cart has been delete',cart})
}

export const clearcart = async (req,resp)=>{
   // const userId ="66c6d88c58505dd29e9f2c22";
    const userId = req.user;
    let cart_data = await cart_model.findOne({userId})
    if (!cart_data){
        cart_data = new cart_model ({userId, items:[]})
    }
    else{
        cart_data.items=[]

    }
    await cart_data.save()
    resp.json({msg:"cart clear"})
}
export const decerease = async(req, resp)=>{
    const {productId,  qty } = req.body;
  //  const userId ="66c6d88c58505dd29e9f2c22";
    const userId = req.user;
    let cart_data = await cart_model.findOne({userId})
    if (!cart_data){
        cart_data = new cart_model({ userId, items:[]})   
    }
    const itemIndex =cart_data.items.findIndex(
        

        // (item) => item.productId.toString() === productId

        // (item) => item.productId.toString() === productId
        (item) => item?.productId?.toString() === productId


    )
    if (itemIndex > -1){
        const  item = cart_data.items[itemIndex]
        if (item.qty > qty){
            const pricePerUnit = item.price/item.qty
            item.qty -=qty
            item.price -=pricePerUnit*qty
        }
        else{
            cart_data.items.splice(itemIndex,1)

        }
    }
    await cart_data.save()
    resp.json({msg:"item qty decereased",cart_data})
}

// export const deletecartById = async(req,resp)=>{
//     // const productId =req.params.productId;
//     const userId ="66c6d88c58505dd29e9f2c22";
    
//     let cart =await cart_model.findOne(userId)
//     console.log(cart,"====================")
//     // if (!cart){
//     //     return resp.json({msg:"invalid id"})
//     // }
//     // cart.items=cart.items.filter(
//     //     (item)=> item.productId.toString()   !== productId
//     // )
//     // cart.save()
//     // resp.json({msg:'your cart has been delete',cart})
// }