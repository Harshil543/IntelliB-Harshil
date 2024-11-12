import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

export const getDashboardData = async ({
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

export const getDashboardLineChartData = async (
  dateRange: {
    startDate: string;
    endDate: string;
  },
  filterCategory: string
) => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS?.dasboardbillanalysis}?startDate=${dateRange && dateRange.startDate}&endDate=${dateRange && dateRange.endDate}&filterCategory=${filterCategory}`
    );

    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
