import apiClient from '@/config/api.config';

export const getUserById = async (profileId: number) => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.profile}/profile/${profileId}`);
    const response = await apiClient.get(`/user/${profileId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id user:', error);
    throw error;
  }
};

export const updateUser = async ({
  id,
  payload
}: {
  payload: any;
  id: number;
}) => {
  try {
    // const response = await apiClient.put(`${BASE_URLS?.profile}/profile/${id}`, payload);
    // const response = await apiClient.put(`/user/${id}`, payload);
    // return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const changePassword = async ({
  id,
  payload
}: {
  payload: any;
  id: number;
}) => {
  try {
    // const response = await apiClient.put(`${BASE_URLS?.profile}/profile/${id}`, payload);
    const response = await apiClient.put(`/user/${id}`, payload);

    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
