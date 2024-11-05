import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

export const getBillingRate = async (meterType: string, type: string) => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS?.billingMode}/${meterType}/${type}`
    );

    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const createBillingRate = async (meterType: string, payload: any) => {
  try {
    const response = await apiBillingClient.post(
      `${BASE_URLS?.billingMode}/${meterType}`,
      payload
    );

    return response?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const deleteBillingRate = async (
  meterType: string,
  type: string,
  id: number
) => {
  try {
    const response = await apiBillingClient.delete(
      `${BASE_URLS?.billingMode}/${meterType}/${type}/${id}`
    );

    return response?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
