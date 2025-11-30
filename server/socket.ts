import { Server as socketServer, Socket } from "socket.io";
import type http from "http";
import Message from "./models/message.model.js";
import User from "./models/user.model.js";

export function initSocket(server: http.Server) {
  const io = new socketServer(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket: Socket) => {
    console.log("a user connected:", socket.id);

    socket.on("join", (channelId: string) => {
      socket.join(channelId);
      console.log(`user ${socket.id} joined channel: ${channelId}`);
    });

    socket.on("message", async (data: any) => {
      try {
        const {channelId, author, msg} = data;

        if (!channelId || !msg) {
          console.warn("invalid message payload", data);
          return;
        }

        
        const created = await Message.create({
          channelId: channelId,
          msg: msg,
          author: author,
          createdAt: new Date(),
        });

        const authorInfo = author ? await User.findById(author).select("tag name _id avatar_url") : null;

        // broadcast authoritative persisted message back to room
        io.to(channelId).emit("message", {
          _id: created._id,
          channelId: created.channelId,
          author: authorInfo,
          msg: created.msg,
          createdAt: created.createdAt,
        });
      } catch (err) {
        console.error("socket message handler error:", err);
        socket.emit("error", { message: "MESSAGE_SAVE_FAILED" });
      }
    });
    
    socket.on("getHistory", async (data: { channelId: string }) => {
      try {
        const { channelId } = data;
        if (!channelId) {
            console.warn("invalid getHistory payload", data);
            return;
        }
        const messages = await Message
          .find({ channelId: channelId })
          .sort({ createdAt: 1 })
          .populate("author", "_id tag name avatar_url");

        console.log("Fetched history for channel:", channelId, messages.length, "messages");
        socket.emit("history", { channelId: channelId, messages: messages });
      } catch (err) {
        console.error("socket getHistory handler error:", err);
        socket.emit("error", { message: "GET_HISTORY_FAILED" });
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });

  return io;
}