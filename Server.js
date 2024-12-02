import express from 'express'
import colors from 'colors'
import mongoose from 'mongoose';
import user_router from './router/user_router.js'
import product_router from './router/product_router.js'
import cart_router from './router/cart_router.js'
import shipping_router from './router/shipping_router.js'
import contact_router from './router/contact_router.js'
import cors from 'cors'
import paymentRouter from './router/payment.js'

const app =express()

app.use(cors({
    origin:true,
    methods:["GET", "POST", "DELETE","PUT"],
    credentials:true
}))

app.use(express.json())
app.use('/api/contact',contact_router)
app.use('/api/shipping',shipping_router)
app.use('/api/user',user_router)
app.use('/api/product',product_router)
app.use('/api/cart',cart_router)
// payment Router
app.use('/api/payment',paymentRouter)




mongoose.connect('mongodb://localhost:27017/gadget').then(()=>{
    console.log(colors.bgGreen("mongodb connected successfully"))
    
}).catch((err)=>{
    console.log(colors.bgBlue("mongodn connectivity error",err))
})

// mongodb://localhost:27017/
const PORT=4000;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.red.underline)
})
