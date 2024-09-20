import apiClient from '@/config/api.config';

interface EmailSettingPayload {
  mailDeliver: string;
  mailHost: string;
  mailPort: string;
  mailUsername: string;
  mailPassword: string;
  mailEncryption: string;
  mailFromAddress: string;
  mailFromName: string;
}

export const getEmailSetting = async () => {
  try {
    const response = await apiClient.get(`/email-setting/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching email-setting:', error);
    throw error;
  }
};

export const getEmailSettingById = async (id: number) => {
  try {
    const response = await apiClient.get(`/email-setting/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id email-setting:', error);
    throw error;
  }
};

export const createEmailSetting = async (payload: EmailSettingPayload) => {
  try {
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
  id: number;
  payload: EmailSettingPayload;
}) => {
  try {
    const response = await apiClient.put(`/email-setting/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating email-setting:', error);
    throw error;
  }
};
