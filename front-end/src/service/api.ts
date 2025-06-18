import axios from 'axios';
import { ApiResponse, ApiError } from './types/index.ts';

const API_BASE_URL = 'https://api.example.com'; // Replace with your API base URL

export const fetchData = async (endpoint: string): Promise<ApiResponse | ApiError> => {
    try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};

export const postData = async (endpoint: string, data: any): Promise<ApiResponse | ApiError> => {
    try {
        const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};