import axios from "axios";
import { handleApiError } from "./ErrorApi";
import type { Node } from "../../../admin/Material/types/node";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});


function getAuthHeaders() {
  const token = window.localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const fetchStudentClasses = async (): Promise<Node[]> => {
  try {
    const res = await API.get<ApiResponse<Node[]>>(
      "/api/student/getClasses",
      getAuthHeaders()
    );
    console.log(res.data.data)
    return res.data.data;
  } catch (error) {
    handleApiError(error);
    throw error; // ✅ ensures Promise<Node[]>
  }
};

export const fetchNodesByParentId = async (
  parentId: string
): Promise<Node[]> => {
  try {
    const res = await API.get<ApiResponse<Node[]>>(
      `/api/student/getChild/${parentId}`,
      getAuthHeaders()
    );
    return res.data.data;
  } catch (error) {
    handleApiError(error);
    throw error; // ✅ ensures Promise<Node[]>
  }
};
