import apiClient from '@/config/api.config';

// Define an interface for the payload
interface LeasableUnitPayload {
  name: string;
  floorAndWing: string;
  smartMeterId: string[];
  status: string;
}

export const getLeasableUnit = async (page: number, searchQuery: string) => {
  try {
    console.log('page', page, 'searchQuery', searchQuery);
    const response = await apiClient.get(`/leasable-unit/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllLeasableUnit = async () => {
  try {
    const response = await apiClient.get(`/leasable-unit/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLeasableUnitById = async (leasableUnitId: number) => {
  try {
    const response = await apiClient.get(`/leasable-unit/${leasableUnitId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createLeasableUnit = async (payload: LeasableUnitPayload) => {
  try {
    const response = await apiClient.post(`/leasable-unit/`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLeasableUnit = async (
  id: number,
  payload: LeasableUnitPayload
) => {
  try {
    const response = await apiClient.put(`/leasable-unit/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const statusLeasableUnit = async (
  id: number,
  payload: LeasableUnitPayload
) => {
  try {
    // Implement status update logic if needed
    console.log('leasable-unit status', payload);
  } catch (error) {
    console.error('Error status leasable-unit:', error);
    throw error;
  }
};
