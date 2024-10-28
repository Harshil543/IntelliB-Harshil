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

export const updateBillingRate = async (id: number, payload: any) => {
  try {
    console.log('update payload', payload);

    // const response = await apiBillingClient.post(
    //   `${BASE_URLS?.billingMode}`,
    //   payload
    // );

    // return response?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
