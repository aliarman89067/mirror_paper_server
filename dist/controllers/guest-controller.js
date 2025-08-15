"use strict";
// import { Request, Response } from "express";
// import { validBoards, validGrades, validSubjects } from "../lib/paper-fields";
// export const createGuest = async (req: Request, res: Response) => {
//   try {
//     const guestCount = await prisma.guest.count();
//     const newGuest = await prisma.guest.create({
//       data: {
//         name: `Guest ${guestCount}`,
//       },
//     });
//     res.status(201).json({
//       id: newGuest.id,
//       name: newGuest.name,
//       image: newGuest.image,
//       createdAt: newGuest.createdAt,
//       updatedAt: newGuest.updatedAt,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: `Something went wrong ${error}` });
//   }
// };
// export const checkPaperSetup = async (req: Request, res: Response) => {
//   const { guestId } = req.params;
//   try {
//     const existingGuest = await prisma.guest.findUnique({
//       where: {
//         id: guestId,
//       },
//       include: {
//         userPaperFields: true,
//       },
//     });
//     if (!existingGuest) {
//       res.status(401).json({
//         success: false,
//         error: "GUEST_NOT_FOUND",
//       });
//       return;
//     }
//     if (
//       !existingGuest?.userPaperFields ||
//       !existingGuest?.userPaperFields?.id
//     ) {
//       res.status(200).json({ success: false, error: "SETUP_NOT_INITIALIZED" });
//       return;
//     }
//     res.status(200).json({
//       success: true,
//       message: "User setup was succesfully initialized",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: `Something went wrong ${error}` });
//   }
// };
// export const papersSetup = async (req: Request, res: Response) => {
//   try {
//     const { guestId } = req.params;
//     const { boards, grades, subjects } = req.body;
//     if (
//       !boards ||
//       boards.length === 0 ||
//       !grades ||
//       grades.length === 0 ||
//       !subjects ||
//       subjects.length === 0
//     ) {
//       res.status(400).json({ message: "Payload is not correct" });
//       return;
//     }
//     let notValid = checkFieldsValidity(boards, grades, subjects);
//     if (notValid) {
//       res.status(400).json({ message: "Fields is not valid" });
//       return;
//     }
//     const newPaperFields = await prisma.userPaperFields.create({
//       data: {
//         guestId,
//       },
//     });
//     const createBoards = boards.map((board: string) => {
//       return prisma.board.create({
//         data: {
//           board,
//           paperFieldId: newPaperFields.id,
//         },
//       });
//     });
//     const createGrades = grades.map((grade: string) => {
//       return prisma.grade.create({
//         data: {
//           grade,
//           paperFieldId: newPaperFields.id,
//         },
//       });
//     });
//     const createSubjects = subjects.map((subject: string) => {
//       return prisma.subject.create({
//         data: {
//           subject,
//           paperFieldId: newPaperFields.id,
//         },
//       });
//     });
//     await Promise.all(createBoards);
//     await Promise.all(createGrades);
//     await Promise.all(createSubjects);
//     res.status(201).json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: `Something went wrong ${error}` });
//   }
// };
// const checkFieldsValidity = (
//   boards: string[],
//   grades: string[],
//   subjects: string[]
// ) => {
//   let notValid = false;
//   for (let i = 0; i < boards.length; i++) {
//     const isValid = validBoards.includes(boards[i]);
//     if (!isValid) {
//       notValid = true;
//       break;
//     }
//   }
//   if (!notValid) {
//     for (let i = 0; i < grades.length; i++) {
//       const isValid = validGrades.includes(grades[i]);
//       if (!isValid) {
//         notValid = true;
//         break;
//       }
//     }
//   }
//   if (!notValid) {
//     for (let i = 0; i < subjects.length; i++) {
//       const isValid = validSubjects.includes(subjects[i]);
//       if (!isValid) {
//         notValid = true;
//         break;
//       }
//     }
//   }
//   return notValid;
// };
// export const paperSkip = async (req: Request, res: Response) => {
//   const { guestId } = req.params;
//   const { boards, grades, subjects } = req.body;
//   try {
//     if (
//       !boards ||
//       boards.length === 0 ||
//       !grades ||
//       grades.length === 0 ||
//       !subjects ||
//       subjects.length === 0
//     ) {
//       res.status(400).json({ message: "Payload is not correct" });
//       return;
//     }
//     let notValid = checkFieldsValidity(boards, grades, subjects);
//     if (notValid) {
//       res.status(400).json({ message: "Fields is not valid" });
//       return;
//     }
//     await prisma.userPaperFields.create({
//       data: {
//         guestId,
//         board: boards,
//         grade: grades,
//         subjects: subjects,
//       },
//     });
//     res.status(201).json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: `Something went wrong ${error}` });
//   }
// };
