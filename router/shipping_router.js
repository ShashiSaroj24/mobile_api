import {addshippingproduct, allshippingproduct} from"../controlers/shipping_controler.js"
import { Authenticated } from "../middlewares/auth.js";
import express from 'express';

const router =express.Router()
router.post('/add', Authenticated,addshippingproduct)
router.get('/view', Authenticated,allshippingproduct)


export default router;