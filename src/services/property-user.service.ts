import apiClient from '@/config/api.config';

// Define appropriate types
interface PropertyUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  designation: string;
  status: string;
}

interface PropertyUserResponse {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  designation: string;
  status: string;
}

export const getPropertyUser = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.property-co-admin}/property-co-admin`);
    const response = await apiClient.get(`/property-user/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property co-admin:', error);
    throw error;
  }
};

export const getPropertyUserById = async (
  propertyUserId: number
): Promise<PropertyUserResponse> => {
  try {
    const response = await apiClient.get(`/property-user/${propertyUserId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id property-user:', error);
    throw error;
  }
};

export const createPropertyUser = async (
  payload: PropertyUserPayload
): Promise<PropertyUserResponse> => {
  try {
    const response = await apiClient.post(`/property-user/`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating property-user:', error);
    throw error;
  }
};

export const updatePropertyUser = async (
  id: number,
  payload: PropertyUserPayload
): Promise<PropertyUserResponse> => {
  try {
    const response = await apiClient.put(`/property-user/${id}`, payload);
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
