// services/auth.service.ts

export const loginUser = async (payload: { email: string; password: string }) => {
    console.log('login payload', payload);
    
    // const response = await apiClient.post(`${BASE_URLS?.user}/login`, payload);
    // return response.data;
};

