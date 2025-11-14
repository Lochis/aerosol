import config from "./server/config/config.ts";
import app from "./server/express.ts";
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
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Aerosol API" });
});
app.listen(config.port, (err: any) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
