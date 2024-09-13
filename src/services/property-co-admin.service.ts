import apiClient from '@/config/api.config';
import { BASE_URLS } from '@/constants/api.constants';

interface PropertyCoAdminPayload {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  designation: string;
  status: string;
}

export const getPropertyCoAdmin = async () => {
  try {
    const response = await apiClient.get(`${BASE_URLS.propertyCoAdmin}`);
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};

export const getpropertyCoAdminById = async (propertCoAdminId: number) => {
  try {
    const response = await apiClient.get(
      `${BASE_URLS.propertyCoAdmin}/${propertCoAdminId}`
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const createPropertyCoAdmin = async ({
  payload
}: {
  payload: PropertyCoAdminPayload;
}) => {
  try {
    const response = await apiClient.post(
      `${BASE_URLS.propertyCoAdmin}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePropertyCoAdmin = async ({
  id,
  payload
}: {
  payload: PropertyCoAdminPayload;
  id: number;
}) => {
  try {
    const response = await apiClient.put(
      `${BASE_URLS.propertyCoAdmin}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const statusPropertyCoAdmin = async ({
  payload
}: {
  payload: PropertyCoAdminPayload;
  id: number;
}) => {
  try {
    // const response = await apiClient.delete(`${BASE_URLS?.property-user}/property-user/${propertyUserId}`);
    // const response = await apiClient.delete(`/property-user/${propertyUserId}`);
    // return response.data;
    console.log('property Co-Admin status', payload);
  } catch (error) {
    console.error('Error deleting property Co-Admin:', error);
    throw error;
  }
};
