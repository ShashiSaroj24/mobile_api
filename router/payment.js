import express from 'express'
import { storePayment,getAllPayments, userOrder, cancelOrder} from "../controlers/payment_controller.js";
import {Authenticated} from '../middlewares/auth.js'

const router = express.Router();

// // checkout
// router.post('/checkout',checkout);
router.post('/storePayment',storePayment);

// Route to get all payments
router.get('/allPayments', getAllPayments);


// user order
router.get("/userorder",Authenticated, userOrder);



//  cancel order
router.put('/:orderId',Authenticated, cancelOrder);



export default router