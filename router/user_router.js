import { allusers, login, profile, register } from "../controlers/user_contrler.js";
import{Authenticated} from "../middlewares/auth.js"
import express from 'express';

const router =express.Router()

router.post('/register',register)
router.get('/all',allusers)
router.post('/login',login)
router.get('/profile',Authenticated,profile)

export default router;