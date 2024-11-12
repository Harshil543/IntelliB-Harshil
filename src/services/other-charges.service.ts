import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

export const getOtherCharges = async (
  page: number,
  searchQuery: string,
  limit: number
) => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS.otherCharges}?page=${page}&limit=${limit}&search=${searchQuery}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const createOtherCharges = async ({ payload }: any) => {
  try {
    const response = await apiBillingClient.post(
      `${BASE_URLS.otherCharges}`,
      payload
    );

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
