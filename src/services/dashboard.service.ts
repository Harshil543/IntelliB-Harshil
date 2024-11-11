import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

export const getDashboardData = async (dateRange: {
  startDate: string;
  endDate: string;
}) => {
  try {
    console.log('dateRange', dateRange);

    const response = await apiBillingClient.get(
      `${BASE_URLS?.dashboard}?startDate=${dateRange && dateRange.startDate}&endDate=${dateRange && dateRange.endDate}`
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
    console.log('res', response.data);

    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
