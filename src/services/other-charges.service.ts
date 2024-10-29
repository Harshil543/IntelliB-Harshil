// import apiBillingClient from '@/config/api.billing.config';
// import { BASE_URLS } from '@/constants/api.constants';

export const createOtherCharges = async ({ payload }: any) => {
  try {
    console.log('other charges payload', payload);

    // const response = await apiBillingClient.post(
    //   `${BASE_URLS.otherCharges}`,
    //   payload
    // );

    // return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
