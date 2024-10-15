import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

interface MeterReading {
  id?: number;
  meterId: number;
  readingDate: Date;
  readingValue: number;
  payload: any;
}
export const getMeterReading = async (page: number, searchQuery: string) => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS.meterReading}?page=${page}&limit=10&search=${searchQuery}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const getMeterReadingById = async (id: number) => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS.meterReading}/${id}`
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
export const createrMeterReading = async (payload: any) => {
  try {
    const response = await apiBillingClient.post(
      `${BASE_URLS.meterReading}`,
      payload
    );
    return response?.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const updateMeterReading = async (id: number, payload: MeterReading) => {
  try {
    const response = await apiBillingClient.put(
      `${BASE_URLS.meterReading}/${id}`,
      payload
    );
    return response?.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'An error occurred';
    throw new Error(message);
  }
};
