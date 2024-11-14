import apiClient from '@/config/api.config';
import { BASE_URLS } from '@/constants/api.constants';

interface TenantDataPayload {
  companyName: string;
  gstNumber: string;
  cinNumber: string;
  address: string;
  salutation: string;
  firstName: string;
  lastName: string;
  designation: string;
  mobileNumber: string;
  email: string;
}

export const getTenant = async (
  page: number,
  searchQuery: string,
  limit: number
) => {
  try {
    const response = await apiClient.get(
      `${BASE_URLS?.tenant}?page=${page}&limit=${limit}&search=${searchQuery}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const getTenantDataById = async (tenantId: number) => {
  try {
    const response = await apiClient.get(`${BASE_URLS?.tenant}/${tenantId}`);
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const createTenantData = async (payload: TenantDataPayload) => {
  try {
    const response = await apiClient.post(`${BASE_URLS?.tenant}`, payload);

    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const updateTenantData = async ({
  id,
  payload
}: {
  id: number;
  payload: TenantDataPayload;
}) => {
  try {
    const response = await apiClient.put(`${BASE_URLS?.tenant}/${id}`, payload);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const deleteTenant = async (id: number) => {
  try {
    const response = await apiClient.delete(`${BASE_URLS.tenant}/${id}`);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const statusTenant = async (id: number) => {
  try {
    const response = await apiClient.patch(`${BASE_URLS?.tenant}/${id}`);
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
