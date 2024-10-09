import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

interface MeterPayload {
  meterType: string;
  meterNumber: string;
  installationDate: Date | null;
  status: string;
  leasableUnitId: number | string;
}

export const getMeter = async (
  page: number,
  searchQuery: string,
  leasableUnitId: number
) => {
  console.log('called', leasableUnitId);

  try {
    if (leasableUnitId) {
      const response = await apiBillingClient.get(
        `${BASE_URLS.meter}/${leasableUnitId}/v1?page=${page}&limit=5&search=${searchQuery}`
      );
      return response?.data?.data;
    }
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const createMeter = async ({
  payload,
  id
}: {
  payload: MeterPayload;
  id: number | null;
}) => {
  try {
    const response = await apiBillingClient.post(
      `${BASE_URLS.meter}/${id}/v1`,
      payload
    );

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const updateMeter = async (id: number, payload: MeterPayload) => {
  try {
    const response = await apiBillingClient.put(
      `${BASE_URLS.meter}/${payload?.leasableUnitId}/v1/${id}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
