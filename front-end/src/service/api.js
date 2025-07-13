import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:5187';

//Get Token
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Common POST method
export const postData = async (url, data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}${url}`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//POST: Login
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials, {
            headers: getAuthHeader(),
        });
        const token = response.data.token || response.data.Token;

        const decoded = jwtDecode(token);
        const accountId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        return { token, accountId };
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

export const loginWithGoogle = async ({ provider, providerKey, email }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login-external`, {
            provider,
            providerKey,
            email
        }, {
            headers: getAuthHeader(),
        });
        const token = response.data.token || response.data.Token;
        return { token };
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//POST: Register
export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/register`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//GET: Full Account
export const getFullAccount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Account`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: Account Info
export const getUserById = async (accountId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/account/${accountId}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};

//POST: Add Account
export const addAccount = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/account`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//PUT: Edit Account
export const editAccount = async (accountId, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/account/${accountId}`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//DELETE: Account
export const deleteAccount = async (accountId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/account/${accountId}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: TestId
export const getTestId = async (testId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/${testId}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: Test Questions
export const getTestQuestion = async (testId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/${testId}/questions`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: Test Result
export const getTestResult = async (testId, resultId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/${testId}/questions?resultId=${resultId}`, {
            headers: getAuthHeader(),
        });
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
        }, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//GET: Test Get Score
export const getTestScore = async (accountId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Test/account/${accountId}/results`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
}

//GET; ConsultantId
export const getConsultantInfo = async (consultantId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Consultant/${consultantId}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
}

// GET: Consultant Schedules
export const getConsultantSchedules = async (consultantId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Appointment/consultant/${consultantId}/schedules`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

// POST: Book Appointment
export const bookAppointment = async (appointmentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/Appointment/book`, appointmentData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//GET: Appointment ID
export const appointmentId = async (appointmentIdData) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Appointment/${appointmentId}`, {
            headers: getAuthHeader(),
        });
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

        const response = await axios.put(url, {
            headers: getAuthHeader(),
        });
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
        const response = await axios.get(`${API_BASE_URL}/api/Event`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//POST: Add Event
export const addEvent = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/Event`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//PUT: Edit Event
export const editEvent = async (eventId, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/Event/${eventId}`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//DELETE: Delete Event
export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/Event/${eventId}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message }
    }
}

//GET: Blog
export const blogData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Blog`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//POST: Add Blog
export const addBlog = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/Blog`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//PUT: Edit Blog
export const editBlog = async (blogId, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/Blog/${blogId}`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//DELETE: Delete Blog
export const deleteBlog = async (blogId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/Blog/${blogId}`, {
            headers: getAuthHeader(),
        })
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}