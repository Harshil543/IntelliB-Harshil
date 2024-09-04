import apiClient from '@/config/api.config';

export const getTenant = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company`);
    const response = await apiClient.get(`/tenant/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tenant:', error);
    throw error;
  }
};

export const getTenantById = async (tenantId: number) => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company/${tenantId}`);
    const response = await apiClient.get(`/tenant/${tenantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id tenant:', error);
    throw error;
  }
};

export const createTenant = async ({ payload }: { payload: any }) => {
  try {
    // const response = await apiClient.post(`${BASE_URLS?.company}/company`, payload);
    const response = await apiClient.post(`/tenant/`, payload);
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
  payload: any;
  id: number;
}) => {
  try {
    // const response = await apiClient.put(`${BASE_URLS?.company}/company/${id}`, payload);
    const response = await apiClient.put(`/tenant/${id}`, payload);

    return response.data;
  } catch (error) {
    console.error('Error creating tenant:', error);
    throw error;
  }
};

export const statusTenant = async ({
  id,
  payload
}: {
  payload: any;
  id: number;
}) => {
  try {
    // const response = await apiClient.delete(`${BASE_URLS?.property-user}/property-user/${propertyUserId}`);
    // const response = await apiClient.delete(`/property-user/${propertyUserId}`);
    // return response.data;
    console.log('tenant status', payload);
  } catch (error) {
    console.error('Error status tenant:', error);
    throw error;
  }
};
