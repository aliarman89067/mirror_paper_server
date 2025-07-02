import { NextFunction, Request, Response } from "express";
// import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
    };
  }
}

export const authMiddelware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const authData = await auth.api.getSession({
    //   headers: fromNodeHeaders(req.headers),
    // });
    // if (!authData) {
    //   res.status(401).json({ message: "Unauthorized user" });
    //   return;
    // }
    req.user = {
      id: "123",
    };
    next();
  } catch (error) {
    console.log("Middleware Error", error);
    res.status(500).json({ message: `Middleware Error ${error}` });
  }
};
