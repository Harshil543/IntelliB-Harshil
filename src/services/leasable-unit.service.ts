import apiClient from '@/config/api.config';

export const getLeasableUnit = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company`);
    const response = await apiClient.get(`/leasable-unit/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leasable-unit:', error);
    throw error;
  }
};

export const getLeasableUnitById = async (leasableUnitId: number) => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company/${leasableUnitId}`);
    const response = await apiClient.get(`/leasable-unit/${leasableUnitId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id leasable-unit:', error);
    throw error;
  }
};

export const createLeasableUnit = async ({ payload }: { payload: any }) => {
  try {
    // const response = await apiClient.post(`${BASE_URLS?.company}/company`, payload);
    const response = await apiClient.post(`/leasable-unit/`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating leasable-unit:', error);
    throw error;
  }
};

export const updateLeasableUnit = async ({
  id,
  payload
}: {
  payload: any;
  id: number;
}) => {
  try {
    // const response = await apiClient.put(`${BASE_URLS?.company}/company/${id}`, payload);
    const response = await apiClient.put(`/leasable-unit/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating leasable-unit:', error);
    throw error;
  }
};

export const statusLeasableUnit = async ({
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
    console.log('leasable-unit status', payload);
  } catch (error) {
    console.error('Error status leasable-unit:', error);
    throw error;
  }
};
