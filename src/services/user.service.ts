import apiClient from '@/config/api.config';
import { BASE_URLS } from '@/constants/api.constants';

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const getUser = async () => {
  try {
    const response = await apiClient.get(`${BASE_URLS?.user}/profile/`);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const updateUser = async ({ payload }: { payload: any }) => {
  try {
    const response = await apiClient.put(
      `${BASE_URLS?.user}/profile/`,
      payload.value
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const changePassword = async ({
  id,
  payload
}: {
  id: number;
  payload: ChangePasswordPayload;
}) => {
  try {
    const response = await apiClient.put(
      `/user/${id}/change-password`,
      payload
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
