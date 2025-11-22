import config from "./config/config.ts";
import app from "./express.ts";
import mongoose from "mongoose";
import type { Request, Response } from "express";
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
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Aerosol API v2" });
});
app.listen(config.port, (err: any) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on address: http://localhost:${config.port}`)
});
