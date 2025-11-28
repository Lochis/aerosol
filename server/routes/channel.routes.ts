import express from 'express';
import { requireSignin } from '../controllers/auth.controller.js'
import { createChannel, getChannels } from '../controllers/channel.controller.js';

const router = express.Router();
router.post('/channel', requireSignin, createChannel)
router.get('/channel', requireSignin, getChannels);

export default router;
