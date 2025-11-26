import express from 'express'
import { login, refresh, requireRefresh, signup } from '../controllers/auth.controller.js'
import { authRatelimit } from '../ratelimits.js'

const router = express.Router()
// router.use(authRatelimit) // don't do this, will affect all /api routes
router.route('/login').post(authRatelimit, login)
router.route('/refresh').post(authRatelimit, requireRefresh, refresh)
router.route('/signup').post(authRatelimit, signup)

export default router
