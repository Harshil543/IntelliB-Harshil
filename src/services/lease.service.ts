import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

interface CreateLeaseParams {
  companyId?: number;
  leasableUnitId?: number;
  payload?: any;
}

export const getLease = async (companyId: number) => {
  try {
    if (companyId) {
      const response = await apiBillingClient.get(
        `${BASE_URLS.lease}/${companyId}`
      );
      return response?.data?.data;
    }
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const createLease = async ({
  companyId,
  leasableUnitId,
  payload
}: CreateLeaseParams) => {
  console.log('hello', companyId, leasableUnitId, payload);

  try {
    const response = await apiBillingClient.post(
      `${BASE_URLS.lease}/${leasableUnitId}/${companyId}`,
      payload
    );
    return response?.data?.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || 'An error occurred';
    throw new Error(message);
  }
};
