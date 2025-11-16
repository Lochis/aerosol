import type { Response } from "express"
import type { Request as JWTRequest } from "express-jwt"

import Post from "../models/post.model.ts"
import User from "../models/user.model.js"

export async function getPosts(req: JWTRequest, res: Response) {
    if (!req.query.before) {
        const posts = await Post.find().limit(10).sort({ createdAt: -1 })
        return res.json(posts)
    }

    const before = new Date(req.query.before as string)
    if (isNaN(before.valueOf())) return res.status(400).json({ error: "before date is not valid" })

    const filter = { createdAt: { "$lt": before } }
    const posts = await Post.find(filter).limit(10).sort({ createdAt: -1 })
    return res.json(posts)
}

export async function createPost(req: JWTRequest, res: Response) {
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    const user = await User.findById(req.auth.sub)
    if (!user) return res.status(404).json({ error: "User not found" })

    const { content } = req.body
    if (!content) return res.status(400).json({ error: "content is required" })

    const post = await Post.create({
        author: user._id,
        content: content,
    })
    return res.json(post)
}

export async function editPost(req: JWTRequest, res: Response) {
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    const user = await User.findById(req.auth.sub)
    if (!user) return res.status(404).json({ error: "User not found" })

    const postId = req.params.id
    if (!postId) return res.status(400).json({ error: "Post ID is required" })

    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: "Post not found" })

    if (post.author._id !== user._id) return res.status(403).json({ error: "Not authorized" })

    const { content } = req.body
    if (content) post.content = content

    await post.save()
    return res.json(post)
}

export async function deletePost(req: JWTRequest, res: Response) {
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    const user = await User.findById(req.auth.sub)
    if (!user) return res.status(404).json({ error: "User not found" })

    const postId = req.params.id
    if (!postId) return res.status(400).json({ error: "Post ID is required" })

    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: "Post not found" })

    if (post.author._id !== user._id) return res.status(403).json({ error: "Not authorized" })

    await Post.findByIdAndDelete(postId)
    return res.status(204)
}
