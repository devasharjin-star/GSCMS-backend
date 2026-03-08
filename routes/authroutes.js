import express from 'express'
import {loginController,registerController} from '../controllers/authController.js'
import { refreshToken } from '../controllers/refreshToken.js'
import { abcontroller } from '../controllers/abcontroller.js'
import { authMiddleare } from '../middleware/authmiddleware.js'

const route=express.Router()

route.post('/register',registerController)
route.post('/login',loginController)
route.get('/refresh',refreshToken)
route.get('/add',authMiddleare,abcontroller)

export default route;