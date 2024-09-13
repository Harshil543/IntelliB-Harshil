import apiClient from '@/config/api.config';
import { BASE_URLS } from '@/constants/api.constants';

// Define interfaces for payloads
interface CompanyPayload {
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  websiteUrl: string;
  gstNumber: string;
  cinNumber: string;
  status?: string;
}

interface StatusPayload {
  status: string;
}

export const getCompany = async () => {
  try {
    const response = await apiClient.get(`${BASE_URLS?.company}`);
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};

export const getCompanyById = async (companyId: number) => {
  try {
    const response = await apiClient.get(`${BASE_URLS?.company}/${companyId}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const createCompany = async (payload: CompanyPayload) => {
  try {
    const response = await apiClient.post(`${BASE_URLS?.company}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCompany = async (
  companyId: number,
  payload: CompanyPayload
) => {
  try {
    const response = await apiClient.put(
      `${BASE_URLS?.company}/${companyId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Error updating company:', error);
    throw error;
  }
};

export const statusCompany = async (id: number, payload: StatusPayload) => {
  try {
    console.log('company status', payload);
    // Implement the status update logic here if needed
  } catch (error) {
    console.error('Error status company:', error);
    throw error;
  }
};
