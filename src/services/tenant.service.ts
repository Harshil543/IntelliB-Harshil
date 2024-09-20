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
interface TenantLeasableUnitDataPayload {
  leasedUnit: string;
  leasedStartDate: string;
  leasedEndDate: string;
}

interface TenantBillingDataPayload {
  bilingMethod: string;
  bilingType: string;
  bilingCycle: string;
  limit: string;
}

export const getTenant = async (page: number, searchQuery: string) => {
  try {
    const response = await apiClient.get(
      `${BASE_URLS?.tenant}?page=${page}&limit=10&search=${searchQuery}`
    );
    return response?.data?.data;
  } catch (error) {
    console.error('Error fetching tenant:', error);
    throw error;
  }
};

// Tenant Company/Personal Data
export const getTenantDataById = async (tenantId: number) => {
  try {
    const response = await apiClient.get(`/tenant/${tenantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id tenant:', error);
    throw error;
  }
};

export const createTenantData = async (payload: TenantDataPayload) => {
  try {
    const response = await apiClient.post(`${BASE_URLS?.tenant}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating tenant:', error);
    throw error;
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
    const response = await apiClient.put(`/tenant/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
};

// Tenant Leasable Unit Data
export const getLeasableUnitDataById = async (tenantId: number) => {
  try {
    const response = await apiClient.get(`/tenant/${tenantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id tenant:', error);
    throw error;
  }
};

export const createLeasableUnitData = async (
  payload: TenantLeasableUnitDataPayload
) => {
  try {
    const response = await apiClient.post('/tenant/', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating tenant:', error);
    throw error;
  }
};

export const updateLeasableUnitData = async ({
  id,
  payload
}: {
  id: number;
  payload: TenantLeasableUnitDataPayload;
}) => {
  try {
    const response = await apiClient.put(`/tenant/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
};

// Tenant Billing Data
export const getTenantBillingDataById = async (tenantId: number) => {
  try {
    const response = await apiClient.get(`/tenant/${tenantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id tenant:', error);
    throw error;
  }
};

export const createTenantBillingData = async (
  payload: TenantBillingDataPayload
) => {
  try {
    const response = await apiClient.post('/tenant/', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating tenant:', error);
    throw error;
  }
};

export const updateTenantBillingData = async ({
  id,
  payload
}: {
  id: number;
  payload: TenantBillingDataPayload;
}) => {
  try {
    const response = await apiClient.put(`/tenant/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
};

export const statusTenant = async (id: number) => {
  try {
    const response = await apiClient.patch(`${BASE_URLS?.tenant}/${id}`);
    return response?.data?.data;
  } catch (error) {
    console.error('Error status company:', error);
    throw error;
  }
};
