import mongoose from "mongoose"

const Post = mongoose.model("Post", new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Author is required"] },
    // title: { type: String, trim: true, required: [true, "Title is required"] },
    content: { type: String, trim: true, required: [true, "Content is required"], maxLength: 2000 },
}, { timestamps: true }))

export default Post
