// src/api/projectApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getProjects = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/projects`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createProject = async (projectData, token) => {
    try {
        const response = await axios.post(`${API_URL}/projects`, projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
