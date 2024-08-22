import apiClient from "@/config/api.config";
import { BASE_URLS } from "@/constants/api.constants";

export const getCompany = async () => {
    // const response = await apiClient.post(`${BASE_URLS?.company}/company`);
    const response = await apiClient.get(`/company/`);    
    return response.data; 
};
