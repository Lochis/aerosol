import type { Response } from "express"
import type { Request as JWTRequest } from "express-jwt"
import Channel from "../models/channel.model.js"
import User from "../models/user.model.js"

export async function createChannel(req: JWTRequest, res: Response) {
    if (!req.auth?.sub) return res.status(401).json({ error: "Not authenticated" })

    // Create channel logic
    const { name, type, members } = req.body

    const existingChannel = await Channel.findOne({ name, type, owner: req.auth.sub })
    if (type == "dm" && existingChannel){
        return res.status(409).json({ error: "Direct message channel already exists" })
    } else {
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

    const channels = await Channel.find({ members: req.auth.sub }).populate('members', 'tag name _id avatar_url')

    res.status(200).json(channels)
}