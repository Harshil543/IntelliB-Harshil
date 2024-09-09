import apiClient from '@/config/api.config';

interface TenantPayload {
  companyName: string;
  gstNumber: string;
  cinNumber: string;
  address: string;
  firstName: string;
  lastName: string;
  designation: string;
  mobileNumber: string;
  email: string;
  leasedUnit: string;
  leasedStartDate: string;
  leasedEndDate: string;
  bilingMethod: string;
  bilingType: string;
  bilingCycle: string;
  limit: string;
}

interface UpdateTenantPayload {
  companyName: string;
  gstNumber: string;
  cinNumber: string;
  address: string;
  firstName: string;
  lastName: string;
  designation: string;
  mobileNumber: string;
  email: string;
  leasedUnit: string;
  leasedStartDate: string;
  leasedEndDate: string;
  bilingMethod: string;
  bilingType: string;
  bilingCycle: string;
  limit: string;
}

export const getTenant = async () => {
  try {
    const response = await apiClient.get('/tenant/');
    return response.data;
  } catch (error) {
    console.error('Error fetching tenant:', error);
    throw error;
  }
};

export const getTenantById = async (tenantId: number) => {
  try {
    const response = await apiClient.get(`/tenant/${tenantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id tenant:', error);
    throw error;
  }
};

export const createTenant = async (payload: TenantPayload) => {
  try {
    const response = await apiClient.post('/tenant/', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating tenant:', error);
    throw error;
  }
};

export const updateTenant = async ({
  id,
  payload
}: {
  id: number;
  payload: UpdateTenantPayload;
}) => {
  try {
    const response = await apiClient.put(`/tenant/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
};

// Assuming statusTenant might be for changing status or other operations, define a type for payload
export const statusTenant = async ({
  payload
}: {
  id: number;
  payload: { status: string }; // Update this type based on your actual payload
}) => {
  try {
    // Example usage of payload
    console.log('tenant status', payload);
    // Uncomment and update the API call if needed
    // const response = await apiClient.patch(`/tenant/${id}/status`, payload);
    // return response.data;
  } catch (error) {
    console.error('Error changing tenant status:', error);
    throw error;
  }
};
