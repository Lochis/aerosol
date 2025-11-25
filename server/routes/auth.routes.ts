import express from 'express'
import { login, refresh, requireRefresh, signup } from '../controllers/auth.controller.js'
const router = express.Router()
router.route('/login').post(login)
router.route('/refresh').post(requireRefresh, refresh)
router.route('/signup').post(signup)

export default router
