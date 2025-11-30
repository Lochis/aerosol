import express from 'express';
import { requireSignin } from '../controllers/auth.controller.js'
import { createChannel, getChannels, deleteChannel } from '../controllers/channel.controller.js';

const router = express.Router();
router.post('/channel', requireSignin, createChannel)
router.get('/channel', requireSignin, getChannels);
router.delete('/channel/:id', requireSignin, deleteChannel);

export default router;
