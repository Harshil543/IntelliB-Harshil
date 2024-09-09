import apiClient from '@/config/api.config';

export const getMeter = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company`);
    const response = await apiClient.get(`/meter/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching meter:', error);
    throw error;
  }
};

export const getMeterById = async (leasableUnitId: number) => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company/${leasableUnitId}`);
    const response = await apiClient.get(`/meter/${leasableUnitId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id meter:', error);
    throw error;
  }
};

export const createMeter = async ({ payload }: { payload: any }) => {
  try {
    // const response = await apiClient.post(`${BASE_URLS?.company}/company`, payload);
    const response = await apiClient.post(`/meter/`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating meter:', error);
    throw error;
  }
};

export const updateMeter = async ({
  id,
  payload
}: {
  payload: any;
  id: number;
}) => {
  try {
    // const response = await apiClient.put(`${BASE_URLS?.company}/company/${id}`, payload);
    const response = await apiClient.put(`/meter/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating meter:', error);
    throw error;
  }
};

export const statusMeter = async ({
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
    console.log('meter status', payload);
  } catch (error) {
    console.error('Error status meter:', error);
    throw error;
  }
};
