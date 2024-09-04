import apiClient from '@/config/api.config';

interface PropertyCoAdminPayload {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  designation: string;
  status: string;
}

export const getPropertyCoAdmin = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.property-co-admin}/property-co-admin`);
    const response = await apiClient.get(`/property-co-admin/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property co-admin:', error);
    throw error;
  }
};

export const getpropertyCoAdminById = async (propertCoAdminId: number) => {
  try {
    // const response = await apiClient.get(`${BASE_URLS?.property-co-admin}/property-co-admin/${propertyCoAdminId}`);
    const response = await apiClient.get(
      `/property-co-admin/${propertCoAdminId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching by id property co-admin:', error);
    throw error;
  }
};

export const createPropertyCoAdmin = async ({
  payload
}: {
  payload: PropertyCoAdminPayload;
}) => {
  try {
    // const response = await apiClient.post(`${BASE_URLS?.property-co-admin}/property-co-admin`, payload);
    const response = await apiClient.post(`/property-co-admin/`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating property co-admin:', error);
    throw error;
  }
};

export const updatePropertyCoAdmin = async ({
  id,
  payload
}: {
  payload: PropertyCoAdminPayload;
  id: number;
}) => {
  try {
    // const response = await apiClient.put(`${BASE_URLS?.property-co-admin}/property-co-admin/${id}`, payload);
    const response = await apiClient.put(`/property-co-admin/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating property co-admin:', error);
    throw error;
  }
};

export const statusPropertyCoAdmin = async ({
  payload
}: {
  payload: PropertyCoAdminPayload;
  id: number;
}) => {
  try {
    // const response = await apiClient.delete(`${BASE_URLS?.property-user}/property-user/${propertyUserId}`);
    // const response = await apiClient.delete(`/property-user/${propertyUserId}`);
    // return response.data;
    console.log('property Co-Admin status', payload);
  } catch (error) {
    console.error('Error deleting property Co-Admin:', error);
    throw error;
  }
};
