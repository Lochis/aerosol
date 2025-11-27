import type { Response } from "express"
import type { Request as JWTRequest } from "express-jwt"

import Post from "../models/post.model.ts"
import User from "../models/user.model.js"

export async function getPosts(req: JWTRequest, res: Response) {
    let filter: any = {}
    if (req.query.before) {
        const before = new Date(req.query.before as string)
        if (isNaN(before.valueOf())) return res.status(400).json({ error: "before date is not valid" })
        filter = { createdAt: { "$lt": before } }
    }

    const posts = await Post
        .find(filter)
        .limit(10)
        .populate("author", "name tag avatar_url")
        .sort({ createdAt: -1 })
    return res.json(posts)
}

export async function getPostsByUser(req: JWTRequest, res: Response) {
    const userId = req.params.id
    if (!userId) return res.status(400).json({ error: "User ID is required" })

    let filter: any = { author: userId }
    if (req.query.before) {
        const before = new Date(req.query.before as string)
        if (isNaN(before.valueOf())) return res.status(400).json({ error: "before date is not valid" })
        filter = { author: userId, createdAt: { "$lt": before } }
    }

    const posts = await Post
        .find(filter)
        .limit(10)
        .populate("author", "name tag avatar_url")
        .sort({ createdAt: -1 })
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

    const post = await Post
        .findById(postId)
        .populate("author", "name tag avatar_url")
    if (!post) return res.status(404).json({ error: "Post not found" })

    if (!post.author.equals(user._id)) return res.status(403).json({ error: "Not authorized" })

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

    const post: any = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: "Post not found" })

    if (!post.author.equals(user._id)) return res.status(403).json({ error: "Not authorized" })

    await Post.findByIdAndDelete(postId)
    return res.sendStatus(204)
}

export async function likePost(req: JWTRequest, res: Response) {
  if (!req.auth?.sub) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const postId = req.params.id;
  if (!postId) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  const post: any = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const userId = String(req.auth.sub);

  // make sure arrays exist
  post.likedBy = post.likedBy || [];
  post.likes = post.likes || 0;

  // do we already have this user?
  const index = post.likedBy.findIndex((id: string) => String(id) === userId);
  let liked: boolean;

  if (index === -1) {
    // like
    post.likedBy.push(userId);
    post.likes += 1;
    liked = true;
  } else {
    // unlike
    post.likedBy.splice(index, 1);
    if (post.likes > 0) post.likes -= 1;
    liked = false;
  }

  await post.save();

  return res.json({ likes: post.likes, liked });
}
