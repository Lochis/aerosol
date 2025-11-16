import type { Response } from "express"
import type { Request as JWTRequest } from "express-jwt"

import Post from "../models/post.model.ts"
import User from "../models/user.model.js"

export async function getPosts(req: JWTRequest, res: Response) {
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    const user = await User.findById(req.auth.sub)
    if (!user) return res.status(404).json({ error: "User not found" })

    return res.json({}) // TODO
}

export async function createPost(req: JWTRequest, res: Response) {
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    const user = await User.findById(req.auth.sub)
    if (!user) return res.status(404).json({ error: "User not found" })

    return res.json({}) // TODO
}

export async function editPost(req: JWTRequest, res: Response) {
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    const user = await User.findById(req.auth.sub)
    if (!user) return res.status(404).json({ error: "User not found" })

    const postId = req.params.id
    if (!postId) return res.status(400).json({ error: "Post ID is required"})

    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: "Post not found" })

    if (post.author._id !== user._id) return res.status(403).json({ error: "Not authorized" })

    // TODO
    return res.status(204)
}

export async function deletePost(req: JWTRequest, res: Response) {
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    const user = await User.findById(req.auth.sub)
    if (!user) return res.status(404).json({ error: "User not found" })

    const postId = req.params.id
    if (!postId) return res.status(400).json({ error: "Post ID is required"})

    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: "Post not found" })

    if (post.author._id !== user._id) return res.status(403).json({ error: "Not authorized" })

    await Post.findByIdAndDelete(postId)
    return res.status(204)
}
