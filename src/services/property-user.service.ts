import apiClient from '@/config/api.config';
import { BASE_URLS } from '@/constants/api.constants';

export const getPropertyUser = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.property-user}/property-user`);
    const response = await apiClient.get(`/property-user/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property-user:', error);
    throw error;
  }
};

export const getpropertyUserById = async (propertyUserId: number) => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.property-user}/property-user/${propertyUserId}`);
    const response = await apiClient.get(`/property-user/${propertyUserId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id property-user:', error);
    throw error;
  }
};

export const createPropertyUser = async ({ payload }: { payload: any }) => {
  try {
    // const response = await apiClient.post(`${BASE_URLS?.property-user}/property-user`, payload);
    const response = await apiClient.post(`/property-user/`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating property-user:', error);
    throw error;
  }
};

export const updatePropertyUser = async ({
  id,
  payload
}: {
  payload: any;
  id: number;
}) => {
  try {
    // const response = await apiClient.put(`${BASE_URLS?.property-user}/property-user/${id}`, payload);
    const response = await apiClient.put(`/property-user/${id}`, payload);

    return response.data;
  } catch (error) {
    console.error('Error creating property-user:', error);
    throw error;
  }
};

export const statusPropertyUser = async ({
  id,
  payload
}: {
  payload: any;
  id: number;
}) => {
  try {
    // const response = await apiClient.delete(`${BASE_URLS?.property-user}/property-user/${propertyUserId}`);
    // const response = await apiClient.delete(`/property-user/${propertyUserId}`);
    // return response.data;
    console.log('property user status', payload);
  } catch (error) {
    console.error('Error deleting property-user:', error);
    throw error;
  }
};
