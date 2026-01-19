import type { Notice } from "../../../admin/Notice/types/types"

const host = import.meta.env.VITE_SERVER_LINK || '';

function getAuthHeaders() {
  const token = window.localStorage.getItem("authToken");
  return {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  };
}

// Type for the API response (based on the server handler)
interface ApiResponse {
  success: boolean;
  data?: Notice[]; // Using INotice from the schema
  count?: number;
  message?: string;
  error?: string;
}

// Function to fetch notices for the student
export const getNoticesForStudent = async (): Promise<Notice[]> => {
  try {
    const response = await fetch(`${host}/student/notice`, { // Adjust endpoint if needed (e.g., /api/notices/student)
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (data.success && data.data) {
      return data.data;
    } else {
      throw new Error(data.message || 'Failed to fetch notices');
    }
  } catch (error) {
    console.error('Error fetching notices:', error);
    throw error;
  }
};