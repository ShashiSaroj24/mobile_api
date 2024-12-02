import { Payment } from "../models/Payment.js";
import Razorpay from "razorpay";
// import dotenv from 'dotenv'

// dotenv.config()

const razorpay = new Razorpay({
  key_id: "rzp_test_gHH711O4gcSjCq"
  // key_secret: "Og3WlQQcVZ5qr1ZZP5UacAhu",
}); 

// checkout
export const checkout = async (req, res) => {
  console.log("enter check out model")
  const { amount, cartItems, userShipping, userId } = req.body;
  console.log("check out api page enter:---", amount, cartItems, userShipping, userId )
  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  // const order = await razorpay.orders.create(options);
  console.log("order")
  res.json({
    // orderId: order.id,
    // orderId: `order_${Date.now()}_${amount}`,
    amount: amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
  console.log("res.json send data")
};


// verify , save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });

  res.json({ message: "payment successfull..", success: true, orderConfirm });
};

// user specificorder
export const userOrder = async (req,res) =>{
  console.log("request value",req)
  let paymentId = req.paymentId.toString();
  // console.log(userId)
  let orders = await Payment.find({ paymentId: paymentId }).sort({ orderDate :-1});
  res.json(orders)
}

// user specificorder
export const allOrders = async (req,res) =>{
 
  let orders = await Payment.find().sort({ orderDate :-1});
  res.json(orders)
}