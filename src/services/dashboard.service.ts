import apiBillingClient from '@/config/api.billing.config';
import apiClient from '@/config/api.config';
import { BASE_URLS } from '@/constants/api.constants';
import { montlyOptions } from '@/constants/data.constants';

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

export const getTenantDashboardData = async ({
  startDate,
  endDate
}: {
  startDate: string;
  endDate: string;
}) => {
  try {
    const response = await apiClient.get(
      `${BASE_URLS?.dashboardTenantAdmin}?startDate=${startDate}&endDate=${endDate}`
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
    const categeoryValue = [
      montlyOptions.PREVIOUS_MONTH,
      montlyOptions.CURRENT_MONTH
    ].includes(filterCategory)
      ? 'monthly'
      : filterCategory;

    const response = await apiBillingClient.get(
      `${BASE_URLS?.dasboardbillanalysis}?startDate=${dateRange && dateRange.startDate}&endDate=${dateRange && dateRange.endDate}&filterCategory=${categeoryValue}`
    );

    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
