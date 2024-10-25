import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

export const getInvoice = async (
  page: number,
  searchQuery: string,
  limit: number
) => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS?.invoice}?page=${page}&limit=${limit}&search=${searchQuery}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const generateInvoice = async (billId: number) => {
  console.log('billId', billId);

  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS?.invoice}/${billId}/invoice`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
