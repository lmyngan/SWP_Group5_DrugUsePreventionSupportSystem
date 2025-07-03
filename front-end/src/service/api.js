import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:5187';

//POST: Login
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
        const token = response.data.token || response.data.Token;

        const decoded = jwtDecode(token);
        const accountId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        return { token, accountId };
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//POST: Register
export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/register`, data);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//GET: Full Account
export const getFullAccount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Account`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: Account Info
export const getUserById = async (accountId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/account/${accountId}`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};

//GET: TestId
export const getTestId = async (testId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/${testId}`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: Test Questions
export const getTestQuestion = async (testId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/${testId}/questions`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: Test Result
export const getTestResult = async (testId, resultId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/${testId}/questions?resultId=${resultId}`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//POST: Test Submit
export const submitTestScore = async ({ accountId, testId, score, riskLevel, recommendation }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/Test/submit`, {
            accountId,
            testId,
            score,
            riskLevel,
            recommendation
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//GET: Test Get Score
export const getTestScore = async (accountId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/account/${accountId}/results`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
}

//GET; ConsultantId
export const getConsultantInfo = async (consultantId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Consultant/${consultantId}`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
}

// GET: Consultant Schedules
export const getConsultantSchedules = async (consultantId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Appointment/consultant/${consultantId}/schedules`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

// POST: Book Appointment
export const bookAppointment = async (appointmentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/Appointment/book`, appointmentData);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//GET: Appointment ID
export const appointmentId = async (appointmentIdData) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Appointment/${appointmentId}`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
}

// PUT: Update Appointment Status
export const updateAppointmentStatus = async (scheduleId, status) => {
    try {
        const url = `${API_BASE_URL}/api/Appointment/${scheduleId}/status?status=${encodeURIComponent(status)}`;
        console.log("Sending request to:", url);

        const response = await axios.put(url);
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Error Details:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message,
            url: error.config?.url
        });
        return { error: error.response?.data?.message || error.message };
    }
};

//GET: Event
export const eventData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Event`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
}

//GET: Blog
export const blogData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Blog`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
}
