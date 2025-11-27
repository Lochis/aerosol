import mongoose from "mongoose"

const Post = mongoose.model("Post", new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Author is required"] },
    // title: { type: String, trim: true, required: [true, "Title is required"] },
    content: { type: String, trim: true, required: [true, "Content is required"], maxLength: 2000 },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true }))

export default Post
