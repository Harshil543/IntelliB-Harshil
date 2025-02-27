import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

export const getConsumptionData = async ({
  startDate,
  endDate
}: {
  startDate: string;
  endDate: string;
}) => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS?.dashboard}?startDate=${startDate}&endDate=${endDate}`
    );

    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
