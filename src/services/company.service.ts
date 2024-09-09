import apiClient from '@/config/api.config';

// Define interfaces for payloads
interface CompanyPayload {
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  websiteUrl: string;
  gstNumber: string;
  cinNumber: string;
  status?: string;
}

interface StatusPayload {
  status: string;
}

export const getCompany = async () => {
  try {
    const response = await apiClient.get(`/company/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company:', error);
    throw error;
  }
};

export const getCompanyById = async (companyId: number) => {
  try {
    const response = await apiClient.get(`/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching by id company:', error);
    throw error;
  }
};

export const createCompany = async (payload: CompanyPayload) => {
  try {
    const response = await apiClient.post(`/company/`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
  }
};

export const updateCompany = async (id: number, payload: CompanyPayload) => {
  try {
    const response = await apiClient.put(`/company/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating company:', error);
    throw error;
  }
};

export const statusCompany = async (id: number, payload: StatusPayload) => {
  try {
    console.log('company status', payload);
    // Implement the status update logic here if needed
  } catch (error) {
    console.error('Error status company:', error);
    throw error;
  }
};
