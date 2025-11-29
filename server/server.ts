import config from "./config/config.ts";
import http from "http";
import {Server as socketServer} from "socket.io";
import app from "./express.ts";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {
  })
  .then(() => {
    const db = mongoose.connection;
    console.log("Connected to the database!");
    console.log("Database name: " + db.name);
    console.log("Database host: " + db.host);
    console.log("Database port: " + db.port);
  });

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

const server = http.createServer(app);

export const io = new socketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("join", (channelId) => {
    socket.join(channelId);
    console.log(`user ${socket.id} joined channel: ${channelId}`);
  });

  socket.on("message", (data) => {
    console.log(data);
    const {channelId, msg} = data;
    
    console.log(`message from ${socket.id} to channel ${channelId}: ${msg}`);
    io.to(channelId).emit("message", { sender: socket.id, msg });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

server.listen(config.port, (err: any) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on address: http://localhost:${config.port}`)
});
