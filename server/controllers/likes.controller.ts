
import type { Response } from "express"
import type { Request as JWTRequest } from "express-jwt"
import Post from "../models/post.model"


// cretes a 'like' document and updates the post's like count
export async function addLike(req: JWTRequest, res: Response) {
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    const postId = req.params.id
    if (!postId) return res.status(400).json({ error: "Post ID is required" })

    const post: any = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: "Post not found" })

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