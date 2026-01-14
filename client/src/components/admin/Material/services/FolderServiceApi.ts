// services/folderService.ts

import type { GetAllFilesResponse } from "../types/FileDetail";
import type { DeleteFolderResponse } from "../types/FolderDetails";
import type { Node } from "../types/node";


interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const host = import.meta.env.VITE_SERVER_LINK || '';

export const createOrFetchClass = async (className: string,targetExam: string,stream:string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${host}/api/material/create-class`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: className,targetExam: targetExam,stream: stream}),
    });

    const data: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to process the class');
    }

    return data;
  } catch (error) {
    console.error('Error creating or fetching class:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const createFolder = async (parentId: string, folderData: Node): Promise<unknown> => {
  try {
    const response = await fetch(`${host}/api/material/create-sub-folder/${parentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(folderData),
    });
    if (!response.ok) throw new Error('Failed to create folder');
    return await response.json();
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
};

export const updateFolder = async (folderId: string, folderData: Node): Promise<unknown> => {
  try {
    const response = await fetch(`${host}/api/material/update-sub-folder/${folderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(folderData),
    });
    if (!response.ok) throw new Error('Failed to update folder');
    return await response.json();
  } catch (error) {
    console.error('Error updating folder:', error);
    throw error;
  }
};

// services/folderService.ts

export const getChildrenByParentId = async (parentId: string): Promise<Node[]> => {
  try {
    const response = await fetch(`${host}/api/material/get-folders/${parentId}`);
    const data = await response.json();

    if (data.success) {
      return data.data; // This will return the list of materials (files/folders)
    } else {
      throw new Error(data.message || 'Failed to fetch child nodes');
    }
  } catch (error) {
    console.error('Error fetching children by parent ID:', error);
    return [];
  }
};


// services/folderService.ts
// export const deleteSubFolder = async (id: string): Promise<{ success: boolean, message: string }> => {
//   try {
//     const response = await fetch(`${host}/api/material/delete-sub-folder/${id}`, {
//       method: 'DELETE',
//     });

//     const data = await response.json();

//     if (data.success) {
//       console.log(data.message); // Handle success (optional)
//       return { success: true, message: data.message }; // Return object with success and message
//     } else {
//       console.error(data.message); // Handle error message (optional)
//       return { success: false, message: data.message }; // Return object with success and message
//     }
//   } catch (error) {
//     console.error('Error deleting subfolder:', error);
//     return { success: false, message: 'Error deleting subfolder' }; // Return object with success and error message
//   }
// };

export const deleteSubFolder = async (id: string): Promise<DeleteFolderResponse> => {
  try {
    const response = await fetch(`${host}/api/material/delete-sub-folder/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting subfolder:', error);
    throw error;
  }
};



// to get all classes having parentId as null
export const getAllClasses = async (): Promise<Node[]> => {
  try {
    const response = await fetch(`${host}/api/material/get-all-classes`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || 'Failed to fetch classes');
    }
  } catch (error) {
    console.error('Error fetching classes:', error);
    return []; // Return an empty array if the API request fails
  }
}

export const confirmFolderDeletion = async (folderId: string) => {
  try {
    const response = await fetch(`${host}/api/material/confirm-folder-deletion`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ folderId })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error confirming folder deletion:', error);
    throw error;
  }
};




// Fetch all existing files with optional search
export const getAllExistingFiles = async (
  searchQuery?: string
): Promise<GetAllFilesResponse> => {
  try {
    const url = searchQuery
      ? `${host}/api/material/files?search=${encodeURIComponent(searchQuery)}`
      : `${host}/api/material/files`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: GetAllFilesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching existing files:', error);
    throw error;
  }
};




