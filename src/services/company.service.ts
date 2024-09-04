import apiClient from '@/config/api.config';
import { BASE_URLS } from '@/constants/api.constants';

export const getCompany = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company`);
    const response = await apiClient.get(`/company/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company:', error);
    throw error;
  }
};

export const getCompanyById = async (companyId: number) => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company/${companyId}`);
    const response = await apiClient.get(`/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id company:', error);
    throw error;
  }
};

export const createCompany = async ({ payload }: { payload: any }) => {
  try {
    // const response = await apiClient.post(`${BASE_URLS?.company}/company`, payload);
    const response = await apiClient.post(`/company/`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
  }
};

export const updateCompany = async ({
  id,
  payload
}: {
  payload: any;
  id: number;
}) => {
  try {
    // const response = await apiClient.put(`${BASE_URLS?.company}/company/${id}`, payload);
    const response = await apiClient.put(`/company/${id}`, payload);

    return response.data;
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
  }
};

export const statusCompany = async ({
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
    console.log('company status', payload);
  } catch (error) {
    console.error('Error status company:', error);
    throw error;
  }
};
