import apiClient from '@/config/api.config';

// Define the payload types based on your API requirements
interface UpdateUserPayload {
  name?: string;
  email?: string;
}

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const getUserById = async (profileId: number) => {
  try {
    const response = await apiClient.get(`/user/${profileId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
};

export const updateUser = async ({
  payload,
  id
}: {
  payload: UpdateUserPayload;
  id: number;
}) => {
  try {
    const response = await apiClient.put(`/user/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
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
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};
