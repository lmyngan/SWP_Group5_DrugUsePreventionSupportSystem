import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:5187';

//POST: LOGIN
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

//POST: REGISTER
export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/register`, data);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//GET: FULL ACCOUNT
export const getFullAccount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Account`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: ACCOUNT INFO
export const getUserById = async (accountId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/account/${accountId}`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};

//GET: TEST ID
export const getTestId = async (testId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/${testId}`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: TEST QUESTION
export const getTestQuestion = async (testId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/${testId}/questions`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: TEST RESULT
export const getTestResult = async (testId, resultId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/${testId}/questions?resultId=${resultId}`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//POST: TEST SCORE
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

// GET: CONSULTANT SCHEDULES
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

//GET: APPOINTMENT ID
export const appointmentId = async (appointmentIdData) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Appointment/${appointmentId}`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
}

//GET: EVENT
export const eventData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Event`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
}

//GET: BLOG
export const blogData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Blog`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
}