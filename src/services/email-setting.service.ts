import apiClient from '@/config/api.config';

export const getEmailSetting = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company`);
    const response = await apiClient.get(`/email-setting/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching email-setting:', error);
    throw error;
  }
};

export const getEmailSettingById = async (id: number) => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.company}/company/${id}`);
    const response = await apiClient.get(`/email-setting/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id email-setting:', error);
    throw error;
  }
};

export const createEmailSetting = async ({ payload }: { payload: any }) => {
  try {
    // const response = await apiClient.post(`${BASE_URLS?.company}/company`, payload);
    const response = await apiClient.post(`/email-setting/`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating email-setting:', error);
    throw error;
  }
};

export const updateEmailSetting = async ({
  id,
  payload
}: {
  payload: any;
  id: number;
}) => {
  try {
    // const response = await apiClient.put(`${BASE_URLS?.company}/company/${id}`, payload);
    const response = await apiClient.put(`/email-setting/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating email-setting:', error);
    throw error;
  }
};
