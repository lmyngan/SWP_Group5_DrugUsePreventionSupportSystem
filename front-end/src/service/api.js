import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:5187';

// LOGIN
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

//REGISTER
export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/register`, data);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

// GET ACCOUNT INFO
export const getUserById = async (accountId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/account/${accountId}`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};