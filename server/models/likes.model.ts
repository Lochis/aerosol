import mongoose from "mongoose";

const Likes = mongoose.model("Likes", new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "User is required"] },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: [true, "Post is required"] },
}, { timestamps: true }));

export default Likes;