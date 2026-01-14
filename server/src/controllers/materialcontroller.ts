
import { Request, Response } from 'express';
import Material from '../models/Material';
// create a api endpoint to add the class selected from dropdown by the admin as a super parent id where i have to add the sub folder
// if the class already exists then i have to show all the details of the existing class
// otherwise create a new class and return the id of the created class
const createClassId = async (req: Request, res: Response) => {
    try {
        const {name,targetExam,stream} = req.body;

        console.log('Received payload:', req.body);
        console.log('Stream value:', stream);
        console.log('Stream type:', typeof stream);

        const findExisting = await Material.findOne({ heading: name,targetExam: targetExam,stream: stream });
        if (findExisting) {
            // here i need to show all the details of the existing class
            return res.status(200).json({ message: 'Class Already Exists', success: false, data: findExisting });
        }
        else {
            const newClass = new Material({
                heading: name,
                class: name,
                targetExam: targetExam,
                stream,
                parentId: null
            })
            const savedClass = await newClass.save();
            return res.status(201).json({ message: 'Class Created Successfully', success: true, data: savedClass });
        }
    } catch (error) {
        console.log("Error in createClassId:", error);
        res.status(500).json({ message: 'Server Error', success: false });

    }
}


// api end point to create a sub folder inside a class selected from the dropdown by the admin
const createSubFolder = async (req: Request, res: Response) => {
    try {
        const parentId = req.params.id;
        const parent = await Material.findById(parentId)
        const { heading, description, fileDetails, referenceDetails, tags, lastDate, type,fileId } = req.body;

        if (!parentId) {
            return res.status(400).json({ message: 'Parent ID is required', success: false });
        }
        if (!heading) {
            return res.status(400).json({ message: 'Heading is required', success: false });
        }
        const newSubMaterial = new Material({
            heading,
            class: parent.class,
            stream: parent.stream,
            targetExam: parent.targetExam,
            description,
            fileDetails,
            referenceDetails,
            tags,
            lastDate,
            parentId,
            type,
            fileId
        })
        const savedSubMaterial = await newSubMaterial.save();
        return res.status(201).json({
            message: 'Sub Folder Created Successfully', success: true, data: savedSubMaterial
        })

    } catch (error) {
        console.log("Error in createClassId:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
}

// find all the folder or files of a given parent id
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

// to delete a sub folder by id
// const deleteSubFolder = async (req: Request, res: Response) => {
//     try {
//         const id = req.params.id; // Get the ID of the folder to be deleted
//         if (!id) {
//             return res.status(400).json({ message: 'ID is required', success: false });
//         }

//         // Find the folder to delete
//         const folder = await Material.findById(id);
//         if (!folder) {
//             return res.status(404).json({ message: 'Sub Folder not found', success: false });
//         }

//         // Step 1: Check if the folder contains subfolders
//         const childFolders = await Material.find({ parentId: id, type: 'folder' });

//         if (childFolders.length > 0) {
//             // If there are subfolders, ask the user to delete them first
//             return res.status(400).json({
//                 message: 'Please delete all subfolders before deleting this folder.',
//                 success: false
//             });
//         }

//         // Step 2: If only files are present, delete the files and the parent folder
//         const childFiles = await Material.find({ parentId: id, type: 'file' });
//         if (childFiles.length > 0) {
//             // Delete all files inside the folder
//             await Material.deleteMany({ parentId: id, type: 'file' });
//         }

//         // Step 3: Now delete the parent folder
//         await Material.findByIdAndDelete(id);

//         // Send success response
//         return res.status(200).json({ message: 'Folder and Files Deleted Successfully', success: true });
//     } catch (error) {
//         console.log("Error in deleteSubFolder:", error);
//         return res.status(500).json({ message: 'Server Error', success: false });
//     }
// };


const deleteSubFolder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; // Get the ID of the folder to be deleted
        if (!id) {
            return res.status(400).json({ message: 'ID is required', success: false });
        }

        // Find the folder to delete
        const folder = await Material.findById(id);
        if (!folder) {
            return res.status(404).json({ message: 'Sub Folder not found', success: false });
        }

        // Step 1: Check if the folder contains subfolders
        const childFolders = await Material.find({ parentId: id, type: 'folder' });

        if (childFolders.length > 0) {
            // If there are subfolders, ask the user to delete them first
            return res.status(400).json({
                message: 'Please delete all subfolders before deleting this folder.',
                success: false
            });
        }

        // Step 2: If only files are present, delete files from Google Drive first
        const childFiles = await Material.find({ parentId: id, type: 'file' });
        
        if (childFiles.length > 0) {
            // Collect all fileIds from fileDetails to delete from Drive
            const driveFileIds: string[] = [];
            
            childFiles.forEach(file => {
                if (file.fileDetails && Array.isArray(file.fileDetails)) {
                    file.fileDetails.forEach((detail: any) => {
                        if (detail.fileId) {
                            driveFileIds.push(detail.fileId);
                        }
                    });
                }
            });

            // Return the fileIds to frontend for deletion
            // Since Google Drive deletion requires OAuth token from frontend
            if (driveFileIds.length > 0) {
                return res.status(200).json({
                    message: 'Files need to be deleted from Google Drive first',
                    success: false,
                    requiresDriveDeletion: true,
                    driveFileIds: driveFileIds,
                    folderId: id
                });
            }

            // If no fileIds (manually added links), just delete from database
            await Material.deleteMany({ parentId: id, type: 'file' });
        }

        // Step 3: Check if the folder itself has fileDetails to delete
        const folderDriveFileIds: string[] = [];
        if (folder.fileDetails && Array.isArray(folder.fileDetails)) {
            folder.fileDetails.forEach((detail: any) => {
                if (detail.fileId) {
                    folderDriveFileIds.push(detail.fileId);
                }
            });
        }

        if (folderDriveFileIds.length > 0) {
            return res.status(200).json({
                message: 'Folder files need to be deleted from Google Drive first',
                success: false,
                requiresDriveDeletion: true,
                driveFileIds: folderDriveFileIds,
                folderId: id
            });
        }

        // Step 4: Now delete the parent folder from database
        await Material.findByIdAndDelete(id);

        // Send success response
        return res.status(200).json({ 
            message: 'Folder and Files Deleted Successfully', 
            success: true 
        });
    } catch (error) {
        console.log("Error in deleteSubFolder:", error);
        return res.status(500).json({ message: 'Server Error', success: false });
    }
};

// NEW ENDPOINT: Confirm deletion after Drive files are deleted
const confirmFolderDeletion = async (req: Request, res: Response) => {
    try {
        const { folderId } = req.body;

        if (!folderId) {
            return res.status(400).json({ message: 'Folder ID is required', success: false });
        }

        // Delete all child files
        await Material.deleteMany({ parentId: folderId, type: 'file' });
        
        // Delete the folder
        await Material.findByIdAndDelete(folderId);

        return res.status(200).json({ 
            message: 'Folder and Files Deleted Successfully', 
            success: true 
        });
    } catch (error) {
        console.log("Error in confirmFolderDeletion:", error);
        return res.status(500).json({ message: 'Server Error', success: false });
    }
};




//update a folder using the id
const updateSubFolder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'ID is required', success: false });
        }

        // Find the existing folder
        const folder = await Material.findById(id);
        if (!folder) {
            return res.status(404).json({ message: 'Sub Folder not found', success: false });
        }

        // Get updated values from the request body
        const { heading, description, fileDetails, referenceDetails, tags, lastDate, type, fileId,targetExam,stream } = req.body;

        // Update fields with new values, keeping the existing ones if not provided
        folder.heading = heading || "";
        folder.description = description || "";
        folder.fileDetails = fileDetails || [];
        folder.targetExam = targetExam || "";
        folder.stream = stream || "";
        folder.referenceDetails = referenceDetails || [];
        folder.tags = tags || [];
        folder.lastDate = lastDate || "";
        folder.type = type || "";

        // Save the updated folder
        const updatedFolder = await folder.save();

        // Return the updated folder data
        return res.status(200).json({
            message: 'Sub Folder Updated Successfully',
            success: true,
            data: updatedFolder
        });

    } catch (error) {
        console.log("Error in updateSubFolder:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
};


// fetching those folders which have the parentId as null
const getAllClasses = async (req: Request, res: Response) => {
    try {
        const classes = await Material.find({ parentId: null }).sort({ createdAt: -1 });
        return res.status(200).json({ message: 'Classes fetched successfully', success: true, data: classes });
    } catch (error) {
        console.log("Error in updateSubFolder:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
}




export default { createClassId, createSubFolder, findByParentId, deleteSubFolder, updateSubFolder, getAllClasses, confirmFolderDeletion };