
// import { Request, Response } from 'express';
// import Material from '../models/Material';
// // create a api endpoint to add the class selected from dropdown by the admin as a super parent id where i have to add the sub folder
// // if the class already exists then i have to show all the details of the existing class
// // otherwise create a new class and return the id of the created class
// const createClassId = async (req: Request, res: Response) => {
//     try {
//         const {className,targetExam,stream} = req.body;


//         const findExisting = await Material.findOne({ classType: className,targetExam: targetExam,stream: stream });
//         if (findExisting) {
//             // here i need to show all the details of the existing class
//             return res.status(200).json({ message: 'Class Already Exists', success: false, data: findExisting });
//         }
//         else {
//             const newClass = new Material({
//                 classType: className,
//                 targetExam: targetExam,
//                 stream,
//                 parentId: null,
//                 heading: `Class ${className}`
//             })
//             const savedClass = await newClass.save();
//             return res.status(201).json({ message: 'Class Created Successfully', success: true, data: savedClass });
//         }
//     } catch (error) {
//         console.log("Error in createClassId:", error);
//         res.status(500).json({ message: 'Server Error', success: false });

//     }
// }


// // api end point to create a sub folder inside a class selected from the dropdown by the admin
// const createSubFolder = async (req: Request, res: Response) => {
//     try {
//         const parentId = req.params.id;
//         const parent = await Material.findById(parentId)
//         const { heading, description, fileDetails, referenceDetails, tags, lastDate, type,fileId } = req.body;

//         if (!parentId) {
//             return res.status(400).json({ message: 'Parent ID is required', success: false });
//         }
//         if (!heading) {
//             return res.status(400).json({ message: 'Heading is required', success: false });
//         }
//         const newSubMaterial = new Material({
//             heading,
//             classType: parent.classType,
//             stream: parent.stream,
//             targetExam: parent.targetExam,
//             description,
//             fileDetails,
//             referenceDetails,
//             tags,
//             lastDate,
//             parentId,
//             type,
//             fileId
//         })
//         const savedSubMaterial = await newSubMaterial.save();
//         return res.status(201).json({
//             message: 'Sub Folder Created Successfully', success: true, data: savedSubMaterial
//         })

//     } catch (error) {
//         console.log("Error in createClassId:", error);
//         res.status(500).json({ message: 'Server Error', success: false });
//     }
// }

// // find all the folder or files of a given parent id
// const findByParentId = async (req: Request, res: Response) => {
//     try {
//         const parentId = req.params.id;
//         if (!parentId) {
//             return res.status(400).json({ message: 'Parent ID is required', success: false });
//         }
//         const materials = await Material.find({ parentId: parentId });
//         return res.status(200).json({ message: 'Materials fetched successfully', success: true, data: materials });
//     } catch (error) {
//         console.log("Error in createClassId:", error);
//         res.status(500).json({ message: 'Server Error', success: false });
//     }
// }

// // to delete a sub folder by id
// // const deleteSubFolder = async (req: Request, res: Response) => {
// //     try {
// //         const id = req.params.id; // Get the ID of the folder to be deleted
// //         if (!id) {
// //             return res.status(400).json({ message: 'ID is required', success: false });
// //         }

// //         // Find the folder to delete
// //         const folder = await Material.findById(id);
// //         if (!folder) {
// //             return res.status(404).json({ message: 'Sub Folder not found', success: false });
// //         }

// //         // Step 1: Check if the folder contains subfolders
// //         const childFolders = await Material.find({ parentId: id, type: 'folder' });

// //         if (childFolders.length > 0) {
// //             // If there are subfolders, ask the user to delete them first
// //             return res.status(400).json({
// //                 message: 'Please delete all subfolders before deleting this folder.',
// //                 success: false
// //             });
// //         }

// //         // Step 2: If only files are present, delete the files and the parent folder
// //         const childFiles = await Material.find({ parentId: id, type: 'file' });
// //         if (childFiles.length > 0) {
// //             // Delete all files inside the folder
// //             await Material.deleteMany({ parentId: id, type: 'file' });
// //         }

// //         // Step 3: Now delete the parent folder
// //         await Material.findByIdAndDelete(id);

// //         // Send success response
// //         return res.status(200).json({ message: 'Folder and Files Deleted Successfully', success: true });
// //     } catch (error) {
// //         console.log("Error in deleteSubFolder:", error);
// //         return res.status(500).json({ message: 'Server Error', success: false });
// //     }
// // };


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

//         // Step 2: If only files are present, delete files from Google Drive first
//         const childFiles = await Material.find({ parentId: id, type: 'file' });

//         if (childFiles.length > 0) {
//             // Collect all fileIds from fileDetails to delete from Drive
//             const driveFileIds: string[] = [];

//             childFiles.forEach(file => {
//                 if (file.fileDetails && Array.isArray(file.fileDetails)) {
//                     file.fileDetails.forEach((detail: any) => {
//                         if (detail.fileId) {
//                             driveFileIds.push(detail.fileId);
//                         }
//                     });
//                 }
//             });

//             // Return the fileIds to frontend for deletion
//             // Since Google Drive deletion requires OAuth token from frontend
//             if (driveFileIds.length > 0) {
//                 return res.status(200).json({
//                     message: 'Files need to be deleted from Google Drive first',
//                     success: false,
//                     requiresDriveDeletion: true,
//                     driveFileIds: driveFileIds,
//                     folderId: id
//                 });
//             }

//             // If no fileIds (manually added links), just delete from database
//             await Material.deleteMany({ parentId: id, type: 'file' });
//         }

//         // Step 3: Check if the folder itself has fileDetails to delete
//         const folderDriveFileIds: string[] = [];
//         if (folder.fileDetails && Array.isArray(folder.fileDetails)) {
//             folder.fileDetails.forEach((detail: any) => {
//                 if (detail.fileId) {
//                     folderDriveFileIds.push(detail.fileId);
//                 }
//             });
//         }

//         if (folderDriveFileIds.length > 0) {
//             return res.status(200).json({
//                 message: 'Folder files need to be deleted from Google Drive first',
//                 success: false,
//                 requiresDriveDeletion: true,
//                 driveFileIds: folderDriveFileIds,
//                 folderId: id
//             });
//         }

//         // Step 4: Now delete the parent folder from database
//         await Material.findByIdAndDelete(id);

//         // Send success response
//         return res.status(200).json({ 
//             message: 'Folder and Files Deleted Successfully', 
//             success: true 
//         });
//     } catch (error) {
//         console.log("Error in deleteSubFolder:", error);
//         return res.status(500).json({ message: 'Server Error', success: false });
//     }
// };

// // NEW ENDPOINT: Confirm deletion after Drive files are deleted
// const confirmFolderDeletion = async (req: Request, res: Response) => {
//     try {
//         const { folderId } = req.body;

//         if (!folderId) {
//             return res.status(400).json({ message: 'Folder ID is required', success: false });
//         }

//         // Delete all child files
//         await Material.deleteMany({ parentId: folderId, type: 'file' });

//         // Delete the folder
//         await Material.findByIdAndDelete(folderId);

//         return res.status(200).json({ 
//             message: 'Folder and Files Deleted Successfully', 
//             success: true 
//         });
//     } catch (error) {
//         console.log("Error in confirmFolderDeletion:", error);
//         return res.status(500).json({ message: 'Server Error', success: false });
//     }
// };




// //update a folder using the id
// const updateSubFolder = async (req: Request, res: Response) => {
//     try {
//         const id = req.params.id;

//         if (!id) {
//             return res.status(400).json({ message: 'ID is required', success: false });
//         }

//         // Find the existing folder
//         const folder = await Material.findById(id);
//         if (!folder) {
//             return res.status(404).json({ message: 'Sub Folder not found', success: false });
//         }

//         // Get updated values from the request body
//         const { heading, description, fileDetails, referenceDetails, tags, lastDate, type,targetExam,stream,classType } = req.body;

//         // Update fields with new values, keeping the existing ones if not provided
//         folder.heading = heading || "";
//         folder.description = description || "";
//         folder.fileDetails = fileDetails || [];
//         folder.targetExam = targetExam || "";
//         folder.stream = stream || "";
//         folder.referenceDetails = referenceDetails || [];
//         folder.tags = tags || [];
//         folder.lastDate = lastDate || "";
//         folder.type = type || "";
//         folder.classType = classType || "";


//         // Save the updated folder
//         const updatedFolder = await folder.save();

//         // Return the updated folder data
//         return res.status(200).json({
//             message: 'Sub Folder Updated Successfully',
//             success: true,
//             data: updatedFolder
//         });

//     } catch (error) {
//         console.log("Error in updateSubFolder:", error);
//         res.status(500).json({ message: 'Server Error', success: false });
//     }
// };


// // fetching those folders which have the parentId as null
// const getAllClasses = async (req: Request, res: Response) => {
//     try {
//         const classes = await Material.find({ parentId: null }).sort({ createdAt: -1 });
//         return res.status(200).json({ message: 'Classes fetched successfully', success: true, data: classes });
//     } catch (error) {
//         console.log("Error in updateSubFolder:", error);
//         res.status(500).json({ message: 'Server Error', success: false });
//     }
// }


// // for searching a file
// const getAllFiles = async (req: Request, res: Response) => {
//     try {
//         const { search } = req.query; // Optional search parameter

//         // Build query to find all materials that have fileDetails
//         let query: any = {
//             fileDetails: { $exists: true, $ne: [] }
//         };

//         // If search parameter is provided, add text search
//         if (search && typeof search === 'string') {
//             query.$or = [
//                 { heading: { $regex: search, $options: 'i' } }, // Case-insensitive search in heading
//                 { 'fileDetails.fileName': { $regex: search, $options: 'i' } }, // Search in file names
//                 { tags: { $regex: search, $options: 'i' } } // Search in tags
//             ];
//         }

//         // Fetch all materials that match the query
//         const materials = await Material.find(query).select('fileDetails heading type');

//         // Use a Map to store unique files (key: uploadLink, value: file object)
//         const uniqueFilesMap = new Map<string, {
//             fileName: string;
//             uploadLink: string;
//             fileId?: string;
//             parentHeading: string;
//             parentId: string;
//         }>();

//         materials.forEach(material => {
//             if (material.fileDetails && Array.isArray(material.fileDetails)) {
//                 material.fileDetails.forEach((file: any) => {
//                     if (file.fileName && file.uploadLink) {
//                         // Use uploadLink as unique key
//                         // If duplicate exists, keep the first occurrence
//                         if (!uniqueFilesMap.has(file.uploadLink)) {
//                             uniqueFilesMap.set(file.uploadLink, {
//                                 fileName: file.fileName,
//                                 uploadLink: file.uploadLink,
//                                 fileId: file.fileId || undefined,
//                                 parentHeading: material.heading,
//                                 parentId: material._id.toString()
//                             });
//                         }
//                     }
//                 });
//             }
//         });

//         // Convert Map values to array
//         const allFiles = Array.from(uniqueFilesMap.values());

//         return res.status(200).json({
//             message: 'Files fetched successfully',
//             success: true,
//             count: allFiles.length,
//             data: allFiles
//         });

//     } catch (error) {
//         console.log("Error in getAllFiles:", error);
//         res.status(500).json({ message: 'Server Error', success: false });
//     }
// };




// export default { createClassId, createSubFolder, findByParentId, deleteSubFolder, updateSubFolder, getAllClasses, confirmFolderDeletion, getAllFiles };



import { Request, Response } from 'express';
import Material from '../models/Material';

// Helper function to build full path
const buildPath = async (parentId: string | null): Promise<Array<{ id: string, heading: string }>> => {
    if (!parentId) return [];

    const parent = await Material.findById(parentId);
    if (!parent) return [];

    // Return parent's path + parent itself
    return [
        ...parent.path || [],
        { id: parent._id.toString(), heading: parent.heading }
    ];
};

// Helper function to update paths for all descendants when a parent's heading changes
const updateDescendantPaths = async (nodeId: string, newHeading: string): Promise<void> => {
    const node = await Material.findById(nodeId);
    if (!node) return;

    // Build the new path for this node
    const newPath = node.parentId ? await buildPath(node.parentId.toString()) : [];

    // Update this node's path
    node.path = newPath;
    await node.save();

    // Find all direct children
    const children = await Material.find({ parentId: nodeId });

    // Recursively update each child's path
    for (const child of children) {
        // The child's new path should be: parent's path + parent
        const childNewPath = [
            ...newPath,
            { id: node._id.toString(), heading: newHeading }
        ];

        child.path = childNewPath;
        await child.save();

        // Recursively update grandchildren
        await updateDescendantPaths(child._id.toString(), child.heading);
    }
};

const createClassId = async (req: Request, res: Response) => {
    try {
        const { className, targetExam, stream } = req.body;

        const findExisting = await Material.findOne({
            classType: className,
            targetExam: targetExam,
            stream: stream
        });

        if (findExisting) {
            return res.status(200).json({
                message: 'Class Already Exists',
                success: false,
                data: findExisting
            });
        }

        const newClass = new Material({
            classType: className,
            targetExam: targetExam,
            stream,
            parentId: null,
            heading: `Class ${className}`,
            path: [] // Root level has empty path
        });

        const savedClass = await newClass.save();
        return res.status(201).json({
            message: 'Class Created Successfully',
            success: true,
            data: savedClass
        });
    } catch (error) {
        console.log("Error in createClassId:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
}

const createSubFolder = async (req: Request, res: Response) => {
    try {
        const parentId = req.params.id;
        const parent = await Material.findById(parentId);

        if (!parent) {
            return res.status(404).json({
                message: 'Parent folder not found',
                success: false
            });
        }

        const { heading, description, fileDetails, referenceDetails, tags, lastDate, type, fileId } = req.body;

        if (!parentId) {
            return res.status(400).json({
                message: 'Parent ID is required',
                success: false
            });
        }
        if (!heading) {
            return res.status(400).json({
                message: 'Heading is required',
                success: false
            });
        }

        // Build the full path
        const fullPath = await buildPath(parentId);

        const newSubMaterial = new Material({
            heading,
            classType: parent.classType,
            stream: parent.stream,
            targetExam: parent.targetExam,
            description,
            fileDetails,
            referenceDetails,
            tags,
            lastDate,
            parentId,
            type,
            fileId,
            path: fullPath // Store the complete path
        });

        const savedSubMaterial = await newSubMaterial.save();

        return res.status(201).json({
            message: 'Sub Folder Created Successfully',
            success: true,
            data: savedSubMaterial,
            breadcrumb: [...fullPath.map(p => p.heading), heading].join(' -> ')
        });

    } catch (error) {
        console.log("Error in createSubFolder:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
}

const findByParentId = async (req: Request, res: Response) => {
    try {
        const parentId = req.params.id;
        if (!parentId) {
            return res.status(400).json({
                message: 'Parent ID is required',
                success: false
            });
        }
        const materials = await Material.find({ parentId: parentId });
        return res.status(200).json({
            message: 'Materials fetched successfully',
            success: true,
            data: materials
        });
    } catch (error) {
        console.log("Error in findByParentId:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
}

const deleteSubFolder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                message: 'ID is required',
                success: false
            });
        }

        const folder = await Material.findById(id);
        if (!folder) {
            return res.status(404).json({
                message: 'Sub Folder not found',
                success: false
            });
        }

        const childFolders = await Material.find({ parentId: id, type: 'folder' });

        if (childFolders.length > 0) {
            return res.status(400).json({
                message: 'Please delete all subfolders before deleting this folder.',
                success: false
            });
        }

        const childFiles = await Material.find({ parentId: id, type: 'file' });

        if (childFiles.length > 0) {
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

            if (driveFileIds.length > 0) {
                return res.status(200).json({
                    message: 'Files need to be deleted from Google Drive first',
                    success: false,
                    requiresDriveDeletion: true,
                    driveFileIds: driveFileIds,
                    folderId: id
                });
            }

            await Material.deleteMany({ parentId: id, type: 'file' });
        }

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

        await Material.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Folder and Files Deleted Successfully',
            success: true
        });
    } catch (error) {
        console.log("Error in deleteSubFolder:", error);
        return res.status(500).json({ message: 'Server Error', success: false });
    }
};

const confirmFolderDeletion = async (req: Request, res: Response) => {
    try {
        const { folderId } = req.body;

        if (!folderId) {
            return res.status(400).json({
                message: 'Folder ID is required',
                success: false
            });
        }

        await Material.deleteMany({ parentId: folderId, type: 'file' });
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

const updateSubFolder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                message: 'ID is required',
                success: false
            });
        }

        const folder = await Material.findById(id);
        if (!folder) {
            return res.status(404).json({
                message: 'Sub Folder not found',
                success: false
            });
        }

        const { heading, description, fileDetails, referenceDetails, tags, lastDate, type, targetExam, stream, classType } = req.body;

        // Check if this is a root folder (no parentId)
        const isRootFolder = !folder.parentId;

        // Determine the new heading based on whether it's root or subfolder
        let newHeading: string;
        let classTypeChanged = false;

        if (isRootFolder) {
            // For root folders, heading is derived from classType
            if (classType && classType !== folder.classType) {
                newHeading = `Class ${classType}`;
                classTypeChanged = true;
            } else {
                newHeading = folder.heading;
            }
        } else {
            // For subfolders, use the provided heading or keep existing
            newHeading = heading || folder.heading;
        }

        // Check if heading changed - we'll need to update descendant paths
        const headingChanged = newHeading !== folder.heading;
        const oldHeading = folder.heading;

        // Update folder fields
        folder.heading = newHeading;
        folder.description = description !== undefined ? description : folder.description;
        folder.fileDetails = fileDetails !== undefined ? fileDetails : folder.fileDetails;
        folder.targetExam = targetExam !== undefined ? targetExam : folder.targetExam;
        folder.stream = stream !== undefined ? stream : folder.stream;
        folder.referenceDetails = referenceDetails !== undefined ? referenceDetails : folder.referenceDetails;
        folder.tags = tags !== undefined ? tags : folder.tags;
        folder.lastDate = lastDate !== undefined ? lastDate : folder.lastDate;
        folder.type = type !== undefined ? type : folder.type;
        folder.classType = classType !== undefined ? classType : folder.classType;

        const updatedFolder = await folder.save();

        // If heading changed, update all descendant paths
        if (headingChanged) {
            await updateDescendantPaths(id, newHeading);
        }

        return res.status(200).json({
            message: isRootFolder ? 'Class Updated Successfully' : 'Sub Folder Updated Successfully',
            success: true,
            data: updatedFolder,
            breadcrumb: isRootFolder
                ? updatedFolder.heading
                : [...updatedFolder.path.map(p => p.heading), updatedFolder.heading].join(' -> '),
            pathsUpdated: headingChanged,
            isRootFolder
        });

    } catch (error) {
        console.log("Error in updateSubFolder:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
};

const getAllClasses = async (req: Request, res: Response) => {
    try {
        const classes = await Material.find({ parentId: null }).sort({ createdAt: -1 });
        return res.status(200).json({
            message: 'Classes fetched successfully',
            success: true,
            data: classes
        });
    } catch (error) {
        console.log("Error in getAllClasses:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
}

const getAllFiles = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;

        let query: any = {
            fileDetails: { $exists: true, $ne: [] }
        };

        if (search && typeof search === 'string') {
            query.$or = [
                { heading: { $regex: search, $options: 'i' } },
                { 'fileDetails.fileName': { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        const materials = await Material.find(query).select('fileDetails heading type path _id');

        const uniqueFilesMap = new Map<string, {
            fileName: string;
            uploadLink: string;
            fileId?: string;
            parentHeading: string;
            parentId: string;
            breadcrumb: string;
            fullPath: Array<{ id: string, heading: string }>;
        }>();

        materials.forEach(material => {
            if (material.fileDetails && Array.isArray(material.fileDetails)) {
                material.fileDetails.forEach((file: any) => {
                    if (file.fileName && file.uploadLink) {
                        if (!uniqueFilesMap.has(file.uploadLink)) {
                            // Build breadcrumb from path
                            const breadcrumbParts = [
                                ...(material.path || []).map(p => p.heading),
                                material.heading
                            ];

                            uniqueFilesMap.set(file.uploadLink, {
                                fileName: file.fileName,
                                uploadLink: file.uploadLink,
                                fileId: file.fileId || undefined,
                                parentHeading: material.heading,
                                parentId: material._id.toString(),
                                breadcrumb: breadcrumbParts.join(' -> '),
                                fullPath: [
                                    ...(material.path || []),
                                    { id: material._id.toString(), heading: material.heading }
                                ]
                            });
                        }
                    }
                });
            }
        });

        const allFiles = Array.from(uniqueFilesMap.values());

        return res.status(200).json({
            message: 'Files fetched successfully',
            success: true,
            count: allFiles.length,
            data: allFiles
        });

    } catch (error) {
        console.log("Error in getAllFiles:", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
};

export default {
    createClassId,
    createSubFolder,
    findByParentId,
    deleteSubFolder,
    updateSubFolder,
    getAllClasses,
    confirmFolderDeletion,
    getAllFiles
};