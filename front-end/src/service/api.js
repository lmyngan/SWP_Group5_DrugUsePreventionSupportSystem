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

export const loginWithGoogle = async (idToken) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login-external`, {
            IdToken: idToken
        }, {
            headers: getAuthHeader(),
        });
        return response.data;
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

//PUT: Edit Profile Account
export const editProfileAccount = async (accountId, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/Account/${accountId}/profile`, data, {
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

//GET: All Consultant
export const getDataConsultant = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Consultant`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: ConsultantId
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

//PUT: Edit Consultant
export const editConsultant = async (consultantId, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/Consultant/${consultantId}`, data, {
            headers: getAuthHeader(),
        })
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
        console.error("API: Booking error details:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message,
            config: {
                url: error.config?.url,
                method: error.config?.method,
                headers: error.config?.headers
            }
        });
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
        const response = await axios.put(`${API_BASE_URL}/api/Appointment/schedule/${scheduleId}/status?status=${encodeURIComponent(status)}`, null, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

//Get: Data Schedule
export const getScheduleData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/schedule`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//POST: Add Schedule
export const addSchedule = async (data) => {
    try {
        // Convert date format to ISO string if it's not already
        let availableDate = data.availableDate;
        if (availableDate && !availableDate.includes('T')) {
            availableDate = new Date(availableDate).toISOString();
        }

        const scheduleData = {
            consultantId: parseInt(data.consultantId) || 0,
            accountId: 0, // Add default accountId if backend requires it
            scheduleId: parseInt(data.scheduleId) || 0,
            availableDate: availableDate || new Date().toISOString(),
            startTime: data.startTime || "",
            endTime: data.endTime || "",
            slot: parseInt(data.slot) || 0
        };

        console.log('Sending schedule data:', scheduleData);

        const response = await axios.post(`${API_BASE_URL}/api/schedule`, scheduleData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Add schedule error:', error.response?.data || error.message);
        return { error: error.response?.data?.message || error.message };
    }
}

//PUT: Edit Schedule
export const editSchedule = async (scheduleId, data) => {
    try {
        const scheduleData = {
            consultantId: data.consultantId || 0,
            accountId: data.accountId || 0,
            scheduleId: scheduleId,
            availableDate: data.availableDate || new Date().toISOString(),
            startTime: data.startTime || "",
            endTime: data.endTime || "",
            slot: data.slot || 0
        };

        const response = await axios.put(`${API_BASE_URL}/api/schedule/${scheduleId}`, scheduleData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//DELETE: Delete schedule
export const deleteSchedule = async (scheduleId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/schedule/${scheduleId}`, {
            headers: getAuthHeader(),
        })
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

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

//POST: Event Participation
export const joinEvent = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/EventParticipation`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
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

//POST: Notification
export const addNotification = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/Notification`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};

//GET: Notification by AccountId
export const getNotificationsByAccountId = async (accountId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Notification/${accountId}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};

//PUT: Mark Notification as Read
export const markAsReadNotification = async (notificationId) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/Notification/mark-as-read/${notificationId}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: Data Report
export const getReportData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Report/summary`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: Top user join event
export const getTopUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Report/top-user-event-participation`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

//GET: Details of top event participants
export const getTopEventDetail = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Report/top-user-event-participation`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

// VNPay Payment Functions
// GET: Create VNPay Payment URL
export const createVNPayUrl = async (appointmentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Appointment/${appointmentId}/vnpay-url`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

// GET: Handle VNPay Callback
export const handleVNPayCallback = async (queryParams) => {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await axios.get(`${API_BASE_URL}/api/Appointment/vnpay-callback?${queryString}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};
