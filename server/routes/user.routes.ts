import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import { requireSignin } from '../controllers/auth.controller.js'
const router = express.Router()

/*router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
router.route('/api/users').delete(userCtrl.removeMany)
router.param('userId', userCtrl.userByID)
router.route('/api/users/:userId').get(userCtrl.read)
router.route('/api/users/:userId').put(userCtrl.update)
router.route('/api/users/:userId').delete(userCtrl.remove)*/

router.route('/users/:tag').get(userCtrl.read);
router.route('/users').get(userCtrl.list);

router.param('tag', userCtrl.userByTag);

router.route('/me')
  .get(requireSignin, userCtrl.me)
  .put(requireSignin, userCtrl.update)
  .delete(requireSignin, userCtrl.remove)

export default router
