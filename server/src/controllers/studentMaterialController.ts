import express, { Request, Response } from 'express'
import Student from '../models/Student';
import Material from '../models/Material';


// const showClass = async(req:Request,res: Response) => {
//     try {
//         const studentId = req.user.id;
//         const student = await Student.findById(studentId);

//         if (!student){
//             return res.status(404).json({message: "Student with the given id is not present",success: false})
//         }

//         const targetExam = student.targetExams;
//         const stream = student.stream;
//         const className = student.currentClass;


//         const allClasses = [];

//         for(const e of targetExam){
//             const classesMaterial = await Material.findOne({targetExam: e,stream: stream, heading: className})
//             allClasses.push(classesMaterial)
//         }

//         return res.status(200).json({message: "Fetched Successfully",success: true,data: allClasses,targetExam})


//     } catch (error) {
//         console.log("Error in createClassId:", error);
//         res.status(500).json({ message: 'Server Error', success: false });
//     }
// }

const showClass = async (req: Request, res: Response) => {
    try {
        const studentId = req.user.id;

        // Populate targetExams and stream to get the full objects with their details
        const student = await Student.findById(studentId)
            .populate('targetExams', 'name _id') // Populate targetExams with name and _id
            .populate('stream', 'name _id');     // Populate stream with name and _id

        if (!student) {
            return res.status(404).json({
                message: "Student with the given id is not present",
                success: false
            });
        }

        const targetExams = student.targetExams; // This will be an array of populated objects
        const stream = student.stream;           // This will be a populated object
        const className = student.currentClass;

        const allClasses = [];

        // Iterate through each target exam
        for (const exam of targetExams) {
            // Query using ObjectId references
            const classesMaterial = await Material.findOne({
                targetExam: exam._id,    // Use the ObjectId
                stream: stream._id,      // Use the ObjectId
                classType: className
            })
                .populate('targetExam', 'name _id')  // Populate to return full details
                .populate('stream', 'name _id');     // Populate to return full details

            if (classesMaterial) {
                allClasses.push(classesMaterial);
            }
        }
        console.log(allClasses)

        // Return the classes with populated data
        return res.status(200).json({
            message: "Fetched Successfully",
            success: true,
            data: allClasses,
            studentInfo: {
                targetExams: targetExams,
                stream: stream,
                currentClass: className
            }
        });

    } catch (error) {
        console.log("Error in showClass:", error);
        res.status(500).json({
            message: 'Server Error',
            success: false
        });
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


export default { showClass, findByParentId };
