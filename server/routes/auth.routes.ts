import express from 'express'
import authCtrl from '../controllers/auth.controller.js' 
const router = express.Router()
router.route('/login').post(authCtrl.login)
router.route('/signup').post(authCtrl.signup)

export default router


