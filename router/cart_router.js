import {  addToCart, getcartById, deletecartById,clearcart, decerease} from "../controlers/cart_controler.js";

import express from 'express';
import { Authenticated } from "../middlewares/auth.js";

const router =express.Router()

router.post('/add',Authenticated,addToCart)
router.get('/spc', Authenticated,getcartById)
router.delete('/del/:productId',Authenticated,deletecartById)
router.delete('/clear',Authenticated,clearcart)
router.post('/--qty',Authenticated,decerease)

export default router;