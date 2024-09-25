import apiBillingClient from '@/config/api.billing.config';
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
    const response = await apiBillingClient.get(
      `${BASE_URLS.leasableUnit}?page=${page}&limit=10&search=${searchQuery}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const getAllLeasableUnit = async () => {
  try {
    const response = await apiClient.get(`${BASE_URLS.leasableUnit}`);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const getLeasableUnitById = async (leasableUnitId: number) => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS.leasableUnit}/${leasableUnitId}`
    );

    return response.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const createLeasableUnit = async (payload: LeasableUnitPayload) => {
  try {
    const response = await apiBillingClient.post(
      `${BASE_URLS.leasableUnit}`,
      payload
    );

    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
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
    const response = await apiBillingClient.put(
      `${BASE_URLS.leasableUnit}/${id}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const statusLeasableUnit = async (
  id: number,
  payload: LeasableUnitPayload
) => {
  try {
    // Implement status update logic if needed
    console.log('leasable-unit status', payload);
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
