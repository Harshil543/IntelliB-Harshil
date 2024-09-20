import apiClient from '@/config/api.config';

interface FixedBillingModelPayload {
  rs: number;
  ps: number;
}

export const createFixedBillingModel = async (
  payload: FixedBillingModelPayload
) => {
  try {
    const response = await apiClient.post('/fixed-billing-model', payload);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const updateFixedBillingModel = async (
  id: number,
  payload: FixedBillingModelPayload
) => {
  try {
    const response = await apiClient.put(`/fixed-billing-model/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
