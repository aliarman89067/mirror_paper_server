import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import "dotenv/config";
import { auth } from "./lib/auth";
import morgan from "morgan";
import helmet from "helmet";

import SetupRouter from "./routers/setup-router";
import UserRouter from "./routers/user-router";
import PapersRouter from "./routers/papers-router";
import GuestRouter from "./routers/guest-router";

const app = express();
app.all("/api/auth/*splat", toNodeHandler(auth));
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
app.use("/api/v1/setup", SetupRouter);
app.use("/api/v1/papers", PapersRouter);
app.use("/api/v1/guest", GuestRouter);

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
