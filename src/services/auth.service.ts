// services/auth.service.ts

import apiClient from "@/config/api.config";
import axios from 'axios'


const baseURL = 'api/user'

export const loginUser = async (payload: { email: string; password: string }) => {
    console.log('login payload', payload);
    
    const response = await apiClient.post(`${baseURL}/login`, payload);
    return response.data;
};

export const getTodo = async () => {
    const response = await axios.get('https://dummyjson.com/todos');
    return response.data; 
};
