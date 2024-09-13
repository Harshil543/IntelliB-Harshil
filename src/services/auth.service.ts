// services/auth.service.ts

import apiClient from '@/config/api.config';
import { BASE_URLS } from '@/constants/api.constants';
import storage from '@/utils/storage';

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post(`${BASE_URLS?.auth}/login`, payload);

    if (response?.data?.code === 201) {
      storage?.setToken(response?.data?.data?.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (payload: {
  newPassword: string;
  confirmPassword: string;
}) => {
  console.log('reset Password payload', payload);
};
