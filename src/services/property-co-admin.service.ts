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

export const getPropertyCoAdmin = async (page: number, searchQuery: string) => {
  try {
    const response = await apiClient.get(
      `${BASE_URLS.propertyCoAdmin}?page=${page}&limit=10&search=${searchQuery}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const getpropertyCoAdminById = async (propertCoAdminId: number) => {
  try {
    const response = await apiClient.get(
      `${BASE_URLS.propertyCoAdmin}/${propertCoAdminId}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
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
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
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
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const statusPropertyCoAdmin = async (id: number) => {
  try {
    const response = await apiClient.patch(
      `${BASE_URLS?.propertyCoAdmin}/${id}`
    );

    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
