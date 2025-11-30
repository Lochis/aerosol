import mongoose from "mongoose";

const Channel = mongoose.model("Channel", new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], unique: [true, "Name must be unique"] },
    type: { type: String, enum: ["channel", "dm"], required: [true, "Type is required"] },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Channel Members are required"] }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Channel Owner is required"] }
}, { timestamps: true }));

export default Channel;