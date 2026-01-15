import express, { Request, Response } from 'express'
import Student from '../models/Student';
import Material from '../models/Material';


const showClass = async(req:Request,res: Response) => {
    try {
        const studentId = req.user.id;
        const student = await Student.findById(studentId);

        if (!student){
            return res.status(404).json({message: "Student with the given id is not present",success: false})
        }

        const targetExam = student.targetExams;
        const stream = student.stream;
        const className = `Class ${student.currentClass}`;
        

        const allClasses = [];

        for(const e of targetExam){
            const classesMaterial = await Material.findOne({targetExam: e,stream: stream, heading: className})
            allClasses.push(classesMaterial)
        }

        return res.status(200).json({message: "Fetched Successfully",success: true,data: allClasses})


    } catch (error) {
        console.log("Error in createClassId:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
}

const findByParentId = async (req: Request, res: Response) => {
    try {
        const parentId = req.params.id;
        if (!parentId) {
            return res.status(400).json({ message: 'Parent ID is required', success: false });
        }
        const materials = await Material.find({ parentId: parentId });
        return res.status(200).json({ message: 'Materials fetched successfully', success: true, data: materials });
    } catch (error) {
        console.log("Error in createClassId:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
}


export default {showClass,findByParentId};
