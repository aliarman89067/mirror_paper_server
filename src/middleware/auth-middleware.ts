import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

export const authMiddelware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(404).json({ message: "Token not found" });
      return;
    }
    const userData = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!userData) {
      res.status(401).json({ message: "Unauthorized User" });
      return;
    }
    req.user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      image: userData.image,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
