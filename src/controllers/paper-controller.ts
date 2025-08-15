import { Request, Response } from "express";
import BoardModel from "../models/Board.model";
import GradeModel from "../models/grade.model";
import SubjectModel from "../models/subject.model";
import PaperFieldsModel from "../models/paperFields.model";
import PaperModel from "../models/paper.model";

export const getBoardsAndGrades = async (req: Request, res: Response) => {
  try {
    const boards = await BoardModel.find();
    const grades = await GradeModel.find();

    res.status(200).json({ boards, grades });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};

export const getSubjects = async (req: Request, res: Response) => {
  const { grades } = req.body;
  try {
    const grade1 = grades[0];
    const grade2 = grades[1];

    let subjects = [];
    if (grade1) {
      const existingSubjects = await SubjectModel.find({ grade: grade1.label });
      subjects.push(...existingSubjects);
    }
    if (grade2) {
      const existingSubjects = await SubjectModel.find({ grade: grade2.label });
      subjects.push(...existingSubjects);
    }
    res.status(200).json(subjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};
export const getUserPaperFields = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const userPaperFields = await PaperFieldsModel.findOne({ userId })
      .populate("boards")
      .populate("grades")
      .populate("subjects");

    if (!userPaperFields) {
      res.status(404).json({ message: "User paper fields not exist" });
      return;
    }
    const firstBoard = await BoardModel.findById(userPaperFields.boards[0]);
    const firstGrade = await GradeModel.findById(userPaperFields.grades[0]);
    const firstSubject = await SubjectModel.findById(
      userPaperFields.subjects[0]
    );

    const existingPapers = await PaperModel.find({
      board: firstBoard?.name,
      grade: firstGrade?.name,
      subject: firstSubject?.name,
      type: "Yearly",
      year: "2024",
    });
    res.status(200).json({
      boards: userPaperFields.boards,
      grades: userPaperFields.grades,
      subjects: userPaperFields.subjects,
      papers: existingPapers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};
export const getPapers = async (req: Request, res: Response) => {
  const { board, grade, subject, type, year } = req.body;
  try {
    const papers = await PaperModel.find({
      board,
      grade,
      subject,
      type,
      year,
    });
    res.status(200).json(papers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};
