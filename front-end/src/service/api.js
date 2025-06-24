// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5187';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const authApi = {
    login: async (credentials) => {
        try {
            // Log request payload for debugging
            console.log('Login Request Payload:', {
                Accountname: credentials.accountname,
                Password: credentials.password
            });

            const response = await api.post('/api/Auth/Login', {
                Accountname: credentials.accountname,
                Password: credentials.password
            });

            // Log successful response
            console.log('Login Response:', response.data);
            return response.data;
        } catch (error) {
            // Enhanced error logging
            console.error('Login Error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                requestPayload: error.config?.data
            });
            throw error;
        }
    },

    register: async (userData) => {
        try {
            // Format date to yyyy-MM-dd
            const date = new Date(userData.dateOfBirth);
            const formattedDate = date.toISOString().split('T')[0];

            const requestData = {
                Accountname: userData.email.trim(),      // Đúng tên trường backend
                Password: userData.password.trim(),
                FullName: userData.fullName.trim(),
                DateOfBirth: formattedDate,
                Address: userData.address.trim(),
                Gender: userData.gender,
                RoleName: "USER"                        // Đúng tên trường backend
            };

            console.log('Register Request Payload:', JSON.stringify(requestData, null, 2));

            const response = await api.post('/api/Auth/Register', requestData);
            return response.data;
        } catch (error) {
            console.error('Register Error Details:', {
                status: error.response?.status,
                validationErrors: error.response?.data?.errors,
                message: error.response?.data?.message,
                rawError: error.response?.data
            });
            throw error;
        }
    }
};

export const accountApi = {
    getAll: async () => {
        const response = await axios.get(`${API_BASE_URL}/account`);
        return response.data;
    },

    getById: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/account/${id}`);
        return response.data;
    }
};

export const userApi = {
    getById: async (accountId) => {
        const response = await api.get(`/api/Account/${accountId}`);
        return response.data;
    }
};