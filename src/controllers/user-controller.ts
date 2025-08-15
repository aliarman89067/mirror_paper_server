import { Request, Response } from "express";
import UserModel from "../models/User.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import PaperFieldsModel from "../models/paperFields.model";
import mongoose, { Types } from "mongoose";
import SubjectModel from "../models/subject.model";
import BoardModel from "../models/Board.model";
import GradeModel from "../models/grade.model";
import PaperModel from "../models/paper.model";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, isOAuth } = req.body;
  try {
    const isAlreadyExist = await UserModel.findOne({ email });
    if (isAlreadyExist) {
      console.log("Already Created");
      res.status(401).json({ code: "USER_ALREADY_EXIST" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
      isOAuth: false,
      saved: [],
    });
    const tokenPayload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      isOAuth: false,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);
    const { password: newUserPass, ...rest } = newUser.toObject();
    res.status(201).json({ token, data: rest });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({
      email,
      isOAuth: false,
    }).populate("saved");
    if (existingUser) {
      const isPassOk = await bcrypt.compare(password, existingUser.password!);
      if (isPassOk) {
        const tokenPayload = {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
          isOAuth: false,
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);
        const { password: newUserPass, ...rest } = existingUser.toObject();
        const userPaperFields = await PaperFieldsModel.findOne({
          userId: existingUser.id,
        })
          .populate("boards")
          .populate("grades")
          .populate("subjects");
        const paperFields = {
          boards: userPaperFields?.boards ?? [],
          grades: userPaperFields?.grades ?? [],
          subjects: userPaperFields?.subjects ?? [],
        };
        const isAccountSetup = !!userPaperFields;
        res
          .status(200)
          .json({ token, data: rest, isAccountSetup, ...paperFields });
      } else {
        res.status(401).json({ code: "USER_NOT_FOUND" });
      }
    } else {
      res.status(401).json({ code: "USER_NOT_FOUND" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const oAuthLogin = async (req: Request, res: Response) => {
  const { name, email, image } = req.body;
  try {
    let user: any = null;
    user = await UserModel.findOne({ email, isOAuth: true });
    let tokenPayload;
    let token;
    if (user) {
      tokenPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        isOAuth: true,
      };
    } else {
      user = await UserModel.create({
        name,
        email,
        image,
        saved: [],
      });
      tokenPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        isOAuth: true,
      };
    }
    token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);
    const { password: userPass, ...rest } = user.toObject();

    const userPaperFields = await PaperFieldsModel.findOne({
      userId: user.id,
    });
    const isAccountSetup = !!userPaperFields;

    res.status(200).json({ token, data: rest, isAccountSetup });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(404).json({ message: "Token not found." });
      return;
    }
    const data = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userPaperFields = await PaperFieldsModel.findOne({ userId: data.id })
      .populate("boards")
      .populate("grades")
      .populate("subjects");
    const isAccountSetup = !!userPaperFields;

    const paperFields = {
      boards: userPaperFields?.boards ?? [],
      grades: userPaperFields?.grades ?? [],
      subjects: userPaperFields?.subjects ?? [],
    };

    res.status(200).json({ data, isAccountSetup, paperFields });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const papersSetup = async (req: Request, res: Response) => {
  const { boards, grades, subjects } = req.body;
  try {
    const userId = req.user.id;
    const formattedBoards = boards.map((item: any) => item._id);
    const formattedGrades = grades.map((item: any) => item._id);
    const formattedSubjects = subjects.map((item: any) => item._id);

    const newPaperSetup = new PaperFieldsModel();
    newPaperSetup.userId = new Types.ObjectId(userId);
    newPaperSetup.boards = formattedBoards;
    newPaperSetup.grades = formattedGrades;
    newPaperSetup.subjects = formattedSubjects;
    await newPaperSetup.save();
    res.status(201).json({
      message: "User account setup successfully",
      boards,
      grades,
      subjects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const getUserWithPaperFields = async (req: Request, res: Response) => {
  try {
    // const token = req.headers["authorization"]?.split(" ")[1];
    // if (!token) {
    //   res.status(404).json({ message: "Token not found." });
    //   return;
    // }
    // const data = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    // const userPaperFields = await PaperFieldsModel.findOne({ userId: data.id });
    // const isAccountSetup = !!userPaperFields;
    const boards = await BoardModel.find();
    const grades = await GradeModel.find();
    const subjects = await SubjectModel.find();

    res.status(200).json({
      boards,
      grades,
      subjects,
    });
    // res.status(200).json({
    //   data,
    //   isAccountSetup,
    //   userPaperFields,
    //   boards,
    //   grades,
    //   subjects,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, image, boards, grades, subjects } = req.body;
    const userId = req.user.id;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, image },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User is not exist!" });
      return;
    }
    await PaperFieldsModel.findOneAndUpdate(
      { userId },
      { boards, grades, subjects }
    );
    const tokenPayload = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      isOAuth: updatedUser.isOAuth,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);
    res.status(202).json({ token, user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const savePaper = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { paperId } = req.body;
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isExist = existingUser.saved.includes(paperId);
    console.log(existingUser.saved);
    console.log(paperId);
    if (isExist) {
      await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { saved: paperId } },
        { new: true }
      );
      res.status(200).json({ message: "Paper removed", status: "REMOVED" });
      return;
    } else {
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $push: { saved: paperId },
        },
        { new: true }
      );
      res.status(200).json({ message: "Paper saved", status: "ADD" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getSavedPapers = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const existingUser = await UserModel.findById(userId).populate("saved");
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const papers = existingUser.saved.reverse();
    res.status(200).json(papers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getAlarmPapers = async (req: Request, res: Response) => {
  try {
    const { paperIds } = req.body;
    const paperObjectIds = paperIds.map(
      (id: string) => new mongoose.Types.ObjectId(id)
    );
    const papers = await PaperModel.find({ _id: { $in: paperObjectIds } });
    res.status(200).json(papers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
