import apiClient from '@/config/api.config';
import { BASE_URLS } from '@/constants/api.constants';

// Define an interface for the payload
interface LeasableUnitPayload {
  name: string;
  floorAndWing: string;
  smartMeterId: string[];
  status: string;
}

export const getLeasableUnit = async (page: number, searchQuery: string) => {
  try {
    const response = await apiClient.get(
      `${BASE_URLS.leasableUnit}?page=${page}&limit=10&search=${searchQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllLeasableUnit = async () => {
  try {
    const response = await apiClient.get(`${BASE_URLS.leasableUnit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLeasableUnitById = async (leasableUnitId: number) => {
  try {
    const response = await apiClient.get(
      `${BASE_URLS.leasableUnit}/${leasableUnitId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createLeasableUnit = async (payload: LeasableUnitPayload) => {
  try {
    console.log('payload Leasable Unit', payload);

    const response = await apiClient.post(`${BASE_URLS.leasableUnit}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLeasableUnit = async ({
  id,
  payload
}: {
  id: number;
  payload: LeasableUnitPayload;
}) => {
  try {
    console.log('leasable unit', payload, 'id', id);

    const response = await apiClient.put(
      `${BASE_URLS.leasableUnit}/${id}`,
      payload
    );
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
