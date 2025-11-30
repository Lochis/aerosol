import type { Response } from "express"
import type { Request as JWTRequest } from "express-jwt"
import Channel from "../models/channel.model.js"
import Message from "../models/message.model.js"

export async function createChannel(req: JWTRequest, res: Response) {
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    // Create channel logic
    const { name, type, members } = req.body

    const existingChannel = await Channel.findOne({owner: req.auth.sub, members: { $all: members }, type: type})
    if (type === "dm" && existingChannel){
        return res.status(409).json({ error: "Direct message channel already exists" })
    } else if (type === "channel" && existingChannel){
       return res.status(409).json({ error: "Channel already exists" })
    }

    const channel = new Channel({
        name,
        type,
        members,
        owner: req.auth.sub, // for deletion, we want the creator to be the owner
    })

    await channel.save()
    res.status(201).json(channel)
}

export async function getChannels(req: JWTRequest, res: Response){
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    const channels = await Channel.find({ $or: [{ owner: req.auth.sub }, { members: req.auth.sub }] })
    .populate('members', 'tag name _id avatar_url')
    .populate('owner', 'tag name _id avatar_url')

    res.status(200).json(channels)
}

export async function deleteChannel(req: JWTRequest, res: Response){
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })
    const channelId = req.params.id
    const channel = await Channel.findById(channelId)
    if (!channel) return res.status(404).json({ error: "Channel not found" })
    if (channel.owner.toString() !== req.auth.sub) return res.status(403).json({ error: "Not authorized to delete this channel" })

    // delete messages and then channel
    await Message.deleteMany({ channel: channelId })
    await channel.deleteOne()
    
    res.status(204).send()
}