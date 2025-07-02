import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUserPaperFields = async (req: Request, res: Response) => {
  const id = req.user.id;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        userPaperFields: true,
      },
    });
    if (!existingUser || !existingUser.userPaperFields) {
      res.status(400).json({ message: "User or User paper fields not found" });
      return;
    }
    res.status(200).json({ data: existingUser.userPaperFields });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};
export const getGuestPaperFields = async (req: Request, res: Response) => {
  const { guestId } = req.params;
  try {
    const existingGuest = await prisma.guest.findUnique({
      where: {
        id: guestId,
      },
      include: {
        userPaperFields: true,
      },
    });
    if (!existingGuest || !existingGuest.userPaperFields) {
      res.status(400).json({ message: "Guest or User paper fields not found" });
      return;
    }
    res.status(200).json({ data: existingGuest.userPaperFields });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};
