import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

// --- Type Definitions ---

interface LoginPayload {
  name: string;
  dob: string;
  phoneNumber: string;
  currentClass: string;
  password: string;
}

interface SendOtpPayload {
  email: string;
}

interface VerifyOtpPayload {
  otp: string;
  email: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  status?: number;
  message?: string;
  authToken?: string; 
  error?: unknown;
}

// --- Helper Functions ---

function getAuthHeaders() {
  const token = window.localStorage.getItem("authToken");
  return {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  };
}

// --- API Functions ---

export async function getLoggedInUser(formData: LoginPayload): Promise<ApiResponse> {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${import.meta.env.VITE_SERVER_LINK}/auth/getLoggedInUser`,
      data: formData,
      headers: getAuthHeaders()
    };
    
    const response = await axios(config);
    
    if (response.status === 200) {
      if (response.data.authToken) {
        window.localStorage.setItem("authToken", response.data.authToken);
      } else {
        // Store email temporarily for OTP flow
        console.log("Storing email for OTP flow:", response);
        window.localStorage.setItem("authEmail", response.data.email);
      }
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    }
    
    return { success: false, status: response.status };

  } catch (error) {
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    const msg = axiosError.response?.data?.message || axiosError.message;
    return {
      success: false,
      status: axiosError.response ? axiosError.response.status : 500,
      message: msg
    };
  }
}

export async function resendOtp(payload: SendOtpPayload): Promise<ApiResponse<{ otp: string }>> {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${import.meta.env.VITE_SERVER_LINK}/auth/resendOtp`,
      data: payload,
      headers: getAuthHeaders()
    };

    const response = await axios(config);

    if (response.status === 201 || response.status === 200) {
      return { 
        success: true, 
        data: response.data,
        status: response.status 
      };
    }

    return { success: false, status: response.status };

  } catch (error) {
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    const msg = axiosError.response?.data?.message || axiosError.message;
    return {
      success: false,
      status: axiosError.response ? axiosError.response.status : 500,
      message: msg
    };
  }
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<ApiResponse> {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${import.meta.env.VITE_SERVER_LINK}/auth/verifyOtp`,
      data: payload,
      headers: getAuthHeaders()
    };
    
    const response = await axios(config);

    if (response.status === 201 || response.status === 200) {
      if (response.data.authToken) {
        window.localStorage.setItem("authToken", response.data.authToken);
        // Clean up temp email
        window.localStorage.removeItem("authEmail");
      }
      return {
        success: true,
        status: response.status
      };
    }
    
    return { success: false, status: response.status };

  } catch (error) {
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    const msg = axiosError.response?.data?.message || axiosError.message;
    return {
      success: false,
      status: axiosError.response ? axiosError.response.status : 500,
      message: msg
    };
  }
}
export async function validateToken(): Promise<boolean> {
  try {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${import.meta.env.VITE_SERVER_LINK}/auth/verifyToken`,
      headers: getAuthHeaders() // Reuses your existing helper
    };
    
    const response = await axios(config);
    return response.status === 200 && response.data.success;
  } catch  {
    // If 401 or network error, token is invalid
    return false;
  }
}
export async function getStudents(): Promise<ApiResponse> {
  try {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${import.meta.env.VITE_SERVER_LINK}/admin/studentControl/getAllStudents`,
      headers: getAuthHeaders()
    };
    const response = await axios(config);
    console.log("getStudents response:", response);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    }
    return { success: false, status: response.status };
  } catch (error) {
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    const msg = axiosError.response?.data?.message || axiosError.message;
    return {
      success: false,
      status: axiosError.response ? axiosError.response.status : 500,
      message: msg
    };
  }
}
export async function addStudent(studentData: unknown): Promise<ApiResponse> {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${import.meta.env.VITE_SERVER_LINK}/admin/studentControl/add`,
      data: studentData,
      headers: getAuthHeaders()
    };
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    return { success: false, message: axiosError.response?.data?.message || "Failed to add student" };
  }
}

export async function updateStudent(id: string, studentData: unknown): Promise<ApiResponse> {
  try {
    const config: AxiosRequestConfig = {
      method: "put",
      url: `${import.meta.env.VITE_SERVER_LINK}/admin/studentControl/update/${id}`,
      data: studentData,
      headers: getAuthHeaders()
    };
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    return { success: false, message: axiosError.response?.data?.message || "Failed to update student" };
  }
}

export async function toggleStudentStatus(id: string): Promise<ApiResponse> {
  try {
    const config: AxiosRequestConfig = {
      method: "put",
      url: `${import.meta.env.VITE_SERVER_LINK}/admin/studentControl/toggle-status/${id}`,
      headers: getAuthHeaders()
    };
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    return { success: false, message: axiosError.response?.data?.message || "Failed to update status" };
  }
}

export async function bulkImportStudents(studentsArray: unknown[]): Promise<ApiResponse> {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${import.meta.env.VITE_SERVER_LINK}/admin/studentControl/bulk-add`,
      data: { students: studentsArray },
      headers: getAuthHeaders()
    };
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    return { success: false, message: axiosError.response?.data?.message || "Import failed" };
  }
}

export async function deleteStudent(id: string): Promise<ApiResponse> {
  try {
    const config: AxiosRequestConfig = {
      method: "delete",
      url: `${import.meta.env.VITE_SERVER_LINK}/admin/studentControl/deleteStudent/${id}`,
      headers: getAuthHeaders()
    };
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  }
  catch (error) {
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    return { success: false, message: axiosError.response?.data?.message || "Failed to delete student" };
  }
}
export async function getStudent(){
  try{
    const config: AxiosRequestConfig ={
      method: "get",
      url: `${import.meta.env.VITE_SERVER_LINK}/student/studentProfile/getStudent`,
      headers: getAuthHeaders()
    };
    const response = await axios(config);
    return {success: true, data: response.data, status: response.status};
  } catch (error){
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    return {success: false, message: axiosError.response?.data?.message || "Failed to fetch student details"};
  }
}


async function crudRequest(method: 'get' | 'post' | 'put' | 'delete', endpoint: string, data?: unknown): Promise<ApiResponse> {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: `${import.meta.env.VITE_SERVER_LINK}${endpoint}`,
      data,
      headers: getAuthHeaders()
    };
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    const axiosError = error as AxiosError;
    // @ts-expect-error response.data is not typed in AxiosError
    return { success: false, message: axiosError.response?.data?.message || "Operation failed" };
  }
}

// --- STREAMS ---
export const getStreams = () => crudRequest('get', '/admin/streamControl/all');
export const addStream = (data: unknown) => crudRequest('post', '/admin/streamControl/add', data);
export const updateStream = (id: string, data: unknown) => crudRequest('put', `/admin/streamControl/update/${id}`, data);
export const deleteStream = (id: string) => crudRequest('delete', `/admin/streamControl/delete/${id}`);
export const getActiveStreams = () => crudRequest('get', '/admin/streamControl/getActiveStreams');
// --- TARGET EXAMS ---
export const getTargetExams = () => crudRequest('get', '/admin/targetExamControl/all');
export const addTargetExam = (data: unknown) => crudRequest('post', '/admin/targetExamControl/add', data);
export const updateTargetExam = (id: string, data: unknown) => crudRequest('put', `/admin/targetExamControl/update/${id}`, data);
export const deleteTargetExam = (id: string) => crudRequest('delete', `/admin/targetExamControl/delete/${id}`);
export const getActiveTargetExams = () => crudRequest('get', '/admin/targetExamControl/getActiveTargetExams');
// --- SUBJECTS ---
// Overwriting getSubjects to match the specific controller response structure if needed, 
// or you can use the generic one if your controller returns pure array.
// The current controller returns { subjects: [] }, so we might need to unwrap it in the component or here.
export const getAllSubjects = () => crudRequest('get', '/admin/subjectControl/all'); 
export const addSubject = (data: unknown) => crudRequest('post', '/admin/subjectControl/add', data);
export const updateSubject = (id: string, data: unknown) => crudRequest('put', `/admin/subjectControl/update/${id}`, data);
export const deleteSubject = (id: string) => crudRequest('delete', `/admin/subjectControl/delete/${id}`);
export const getActiveSubjects = () => crudRequest('get', '/admin/subjectControl/getActiveSubjects');