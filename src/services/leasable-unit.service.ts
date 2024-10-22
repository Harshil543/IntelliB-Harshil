import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

// Define an interface for the payload
interface LeasableUnitPayload {
  name: string;
  floorAndWing: string;
  smartMeterId: string[];
  status: string;
}

export const getLeasableUnit = async (
  page: number,
  searchQuery: string,
  limit: number
) => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS.leasableUnit}?page=${page}&limit=${limit}&search=${searchQuery}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const getAllLeasableUnit = async () => {
  try {
    const response = await apiBillingClient.get(`${BASE_URLS.leasableUnit}`);
    return response?.data?.data?.items;
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
