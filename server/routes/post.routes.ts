import express from 'express'
import authCtrl from '../controllers/auth.controller.js'
import { createPost, deletePost, editPost, getPosts, getPostsByUser } from '../controllers/post.controller.ts'

const router = express.Router()
router.get('/posts', getPosts)
router.get('/posts/user/:id', getPostsByUser)
router.post('/posts', authCtrl.requireSignin, createPost)
router.patch('/posts/:id', authCtrl.requireSignin, editPost)
router.delete('/posts/:id', authCtrl.requireSignin, deletePost)

export default router
