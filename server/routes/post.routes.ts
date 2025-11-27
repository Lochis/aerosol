import express from 'express'
import { requireSignin } from '../controllers/auth.controller.js'
import { createPost, deletePost, editPost, getPosts, getPostsByUser, likePost } from '../controllers/post.controller.ts'

const router = express.Router()
router.get('/posts', getPosts)
router.get('/posts/user/:id', getPostsByUser)
router.post('/posts', requireSignin, createPost)
router.patch('/posts/:id', requireSignin, editPost)
router.delete('/posts/:id', requireSignin, deletePost)
router.post('/posts/:id/like', requireSignin, likePost)

export default router
