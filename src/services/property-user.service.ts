import apiClient from '@/config/api.config';
import { BASE_URLS } from '@/constants/api.constants';

// Define appropriate types
interface PropertyUserPayload {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  designation: string;
}

interface PropertyUserResponse {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  designation: string;
}

export const getPropertyUser = async () => {
  try {
    const response = await apiClient.get(`${BASE_URLS?.propertyUser}`);
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};

export const getPropertyUserById = async (
  propertyUserId: number
): Promise<PropertyUserResponse> => {
  try {

    const response = await apiClient.get(
      `${BASE_URLS.propertyUser}/${propertyUserId}`
    );
    return response.data?.data;

  } catch (error) {
    throw error;
  }
};

export const createPropertyUser = async ({
  payload
}: {
  payload: PropertyUserPayload;
}) => {
  try {
    const response = await apiClient.post(`${BASE_URLS.propertyUser}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePropertyUser = async ({
  id,
  payload
}: {
  payload: PropertyUserPayload;
  id: number;
}) => {
  try {
    const response = await apiClient.put(
      `${BASE_URLS.propertyUser}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Error updating property-user:', error);
    throw error;
  }
};

export const statusPropertyUser = async (
  payload: PropertyUserPayload
): Promise<void> => {
  try {
    console.log('property user status', payload);
  } catch (error) {
    console.error('Error processing property-user status:', error);
    throw error;
  }
};
