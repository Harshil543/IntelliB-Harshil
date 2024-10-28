import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

export const getBillingConfiguration = async () => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS?.billingConfiguration}`
    );

    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const createBillingConfiguration = async (payload: any) => {
  try {
    const response = await apiBillingClient.post(
      `${BASE_URLS?.billingConfiguration}`,
      payload
    );

    return response?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
