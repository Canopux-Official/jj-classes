import {Request, Response} from "express";
import Subject from "../models/Subject";

export const getAllSubjects = async (req: Request, res: Response) => {
    try {
        const subjects = await Subject.find({isActive: true}).sort({name: 1});
        return res.status(200).json({ subjects });
    } catch (error) {
        console.error("Error fetching subjects:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};