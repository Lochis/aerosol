import express from 'express'
import authCtrl from '../controllers/auth.controller.js' 
const router = express.Router()
router.route('/users/login').post(authCtrl.signin)
router.route('/users/signup').post(authCtrl.signup)

router.route('/me').get(authCtrl.requireSignin, authCtrl.me)

export default router


