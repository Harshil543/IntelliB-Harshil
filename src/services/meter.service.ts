import apiClient from '@/config/api.config';

interface MeterPayload {
  meterType: string;
  meterNumber: string;
  installationDate: Date | null;
  status: string;
  leasableUnitId: number | string;
}

export const getMeter = async () => {
  try {
    const response = await apiClient.get('/meter/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMeterById = async (id: number) => {
  try {
    const response = await apiClient.get(`/meter/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMeter = async (payload: MeterPayload) => {
  try {
    console.log('payload', payload);

    const response = await apiClient.post(`/meter/`, payload?.value);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMeter = async (id: number, payload: MeterPayload) => {
  try {
    const response = await apiClient.put(`/meter/${id}`, payload?.value);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const statusMeter = async (id: number, payload: MeterPayload) => {
  try {
    console.log(`Meter status`, payload);
  } catch (error) {
    throw error;
  }
};
