import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { validBoards, validGrades, validSubjects } from "../lib/paper-fields";

const prisma = new PrismaClient();

export const checkUserPaperSetup = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        userPaperFields: true,
      },
    });
    if (!existingUser) {
      res.status(401).json({
        success: false,
        error: "USER_NOT_FOUND",
      });
      return;
    }
    if (
      !existingUser?.userPaperFields ||
      !existingUser?.userPaperFields[0]?.id
    ) {
      res.status(200).json({ success: false, error: "SETUP_NOT_INITIALIZED" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User setup was succesfully initialized",
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};
export const papersSetup = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { boards, grades, subjects } = req.body;
    if (
      !boards ||
      boards.length === 0 ||
      !grades ||
      grades.length === 0 ||
      !subjects ||
      subjects.length === 0
    ) {
      res.status(400).json({ message: "Payload is not correct" });
      return;
    }
    let notValid = checkFieldsValidity(boards, grades, subjects);
    if (notValid) {
      res.status(400).json({ message: "Fields is not valid" });
      return;
    }

    await prisma.userPaperFields.create({
      data: {
        userId,
        board: boards,
        grade: grades,
        subjects: subjects,
      },
    });
    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};

const checkFieldsValidity = (
  boards: string[],
  grades: string[],
  subjects: string[]
) => {
  let notValid = false;
  for (let i = 0; i < boards.length; i++) {
    const isValid = validBoards.includes(boards[i]);
    if (!isValid) {
      notValid = true;
      break;
    }
  }
  if (!notValid) {
    for (let i = 0; i < grades.length; i++) {
      const isValid = validGrades.includes(grades[i]);
      if (!isValid) {
        notValid = true;
        break;
      }
    }
  }
  if (!notValid) {
    for (let i = 0; i < subjects.length; i++) {
      const isValid = validSubjects.includes(subjects[i]);
      if (!isValid) {
        notValid = true;
        break;
      }
    }
  }
  return notValid;
};

export const paperSkip = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { boards, grades, subjects } = req.body;
  try {
    if (
      !boards ||
      boards.length === 0 ||
      !grades ||
      grades.length === 0 ||
      !subjects ||
      subjects.length === 0
    ) {
      res.status(400).json({ message: "Payload is not correct" });
      return;
    }
    let notValid = checkFieldsValidity(boards, grades, subjects);
    if (notValid) {
      res.status(400).json({ message: "Fields is not valid" });
      return;
    }

    await prisma.userPaperFields.create({
      data: {
        userId,
        board: boards,
        grade: grades,
        subjects: subjects,
      },
    });
    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};
