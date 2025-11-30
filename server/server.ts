import config from "./config/config.ts";
import http from "http";
import app from "./express.ts";
import mongoose from "mongoose";
import { initSocket } from "./socket.ts";

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

export const io = initSocket(server);

server.listen(config.port, (err: any) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on address: http://localhost:${config.port}`)
});
