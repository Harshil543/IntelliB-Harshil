import apiClient from "@/config/api.config";
import { BASE_URLS } from "@/constants/api.constants";

export const getCompany = async () => {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company`);
    const response = await apiClient.get(`/company/`);    
    return response.data; 
};


export const createCompany = async (payload: { email: string; password: string }) => {
    console.log('login payload', payload);

    const response = await apiClient.post(`/company/`, payload);   
    console.log('create response', response);

    // const response = await apiClient.post(`${BASE_URLS?.company}/company`, payload);
    return response.data;
};

