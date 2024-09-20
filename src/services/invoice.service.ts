// import apiClient from '@/config/api.config';

// interface InvociceProps {}
// export const getInvoice = async () => {
//   try {
//     // const response = await apiClient.get(`${BASE_URLS?.company}/company`);
//     const response = await apiClient.get(`/invoice/`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching invoice:', error);
//     throw error;
//   }
// };

// export const getInvoiceById = async (id: number) => {
//   try {
//     // const response = await apiClient.get(`${BASE_URLS?.company}/company/${id}`);
//     const response = await apiClient.get(`/invoice/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching by id invoice:', error);
//     throw error;
//   }
// };

// export const createInvoice = async ({
//   payload
// }: {
//   payload: InvociceProps;
// }) => {
//   try {
//     // const response = await apiClient.post(`${BASE_URLS?.company}/company`, payload);
//     const response = await apiClient.post(`/invoice/`, payload);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating invoice:', error);
//     throw error;
//   }
// };

// export const updateInvoice = async ({
//   id,
//   payload
// }: {
//   payload: InvociceProps;
//   id: number;
// }) => {
//   try {
//     // const response = await apiClient.put(`${BASE_URLS?.company}/company/${id}`, payload);
//     const response = await apiClient.put(`/invoice/${id}`, payload);

//     return response.data;
//   } catch (error) {
//     console.error('Error creating invoice:', error);
//     throw error;
//   }
// };

// export const statusInvoice = async ({
//   id,
//   payload
// }: {
//   payload: any;
//   id: number;
// }) => {
//   try {
//     // const response = await apiClient.delete(`${BASE_URLS?.property-user}/property-user/${propertyUserId}`);
//     // const response = await apiClient.delete(`/property-user/${propertyUserId}`);
//     // return response.data;
//     console.log('invoice status', payload);
//   } catch (error) {
//     console.error('Error status invoice:', error);
//     throw error;
//   }
// };
