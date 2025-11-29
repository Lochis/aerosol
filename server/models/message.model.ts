import mongoose from "mongoose"

const Message = mongoose.model("Message", new mongoose.Schema({
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: [true, "Channel is required"] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Author is required"] },
    msg: { type: String, required: [true, "Message content is required"] }
}, { timestamps: true }))

export default Message