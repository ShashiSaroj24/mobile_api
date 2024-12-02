import express from 'express';
import { contact } from '../controlers/contact_controler.js';
const router =express.Router()
router.post('/con',  contact)

export default router;