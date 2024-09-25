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

export const getCompany = async (page: number, searchQuery: string) => {
  try {
    const response = await apiClient.get(
      `${BASE_URLS?.company}?page=${page}&limit=10&search=${searchQuery}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const getCompanyById = async (companyId: number) => {
  try {
    const response = await apiClient.get(`${BASE_URLS?.company}/${companyId}`);
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const createCompany = async (payload: CompanyPayload) => {
  try {
    const response = await apiClient.post(`${BASE_URLS?.company}`, payload);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
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
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const statusCompany = async (id: number) => {
  try {
    const response = await apiClient.patch(`${BASE_URLS?.company}/${id}`);

    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
