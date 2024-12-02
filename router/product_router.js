import { addproduct, allproduct,getproductById,updateproductById,deleteproductById ,searchproductById } from "../controlers/product_controler.js";
import express from 'express';

const router =express.Router()
router.post('/addproduct', addproduct)
router.get('/allproduct',allproduct)
router.get('/:id', getproductById)
router.put('/:id', updateproductById )
router.delete('/:id', deleteproductById )
router.get('/title', searchproductById )
export default router;