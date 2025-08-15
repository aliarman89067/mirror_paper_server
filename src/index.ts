import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import helmet from "helmet";

import SetupRouter from "./routers/setup-router";
import UserRouter from "./routers/user-router";
import PapersRouter from "./routers/papers-router";
import mongoose from "mongoose";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json());
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/papers", PapersRouter);

app.get("/test", async (req, res) => {
  res.send("Server is running");
});

mongoose.connect(process.env.MONGO_URI!).then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
