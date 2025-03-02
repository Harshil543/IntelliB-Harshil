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

export const getPropertyUser = async (page: number, searchQuery: string) => {
  try {
    const response = await apiClient.get(
      `${BASE_URLS?.propertyUser}?page=${page}&limit=10&search=${searchQuery}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
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
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
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
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
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
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const statusPropertyUser = async (id: number): Promise<void> => {
  try {
    const response = await apiClient.patch(`${BASE_URLS?.propertyUser}/${id}`);
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
