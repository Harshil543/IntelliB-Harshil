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

// export const generateInvoice = async (billId: number) => {
//   try {
//     const response = await apiBillingClient.get(
//       `${BASE_URLS?.invoice}/${billId}/invoice`
//     );
//     return response?.data?.data;
//   } catch (error: any) {
//     const message = error.response?.data?.message;
//     throw new Error(message);
//   }
// };

export const generateInvoice = async (billId: number) => {
  try {
    const response = await apiBillingClient.get(
      `${BASE_URLS?.invoice}/${billId}/invoice`
    );
    const { base64File, fileName } = response?.data?.data;

    // Convert base64 string to a binary blob
    const byteCharacters = atob(base64File.split(',')[1]); // Decode base64 part after comma
    const byteArrays = [];

    // Convert each character to a byte
    for (let offset = 0; offset < byteCharacters.length; offset++) {
      byteArrays.push(byteCharacters.charCodeAt(offset));
    }

    // Create a Blob from the byte array
    const blob = new Blob([new Uint8Array(byteArrays)], {
      type: 'application/pdf'
    });

    // Create an anchor element for downloading
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Create a URL for the Blob
    link.download = fileName || 'Invoice.pdf'; // Use the fileName or default to 'Invoice.pdf'

    // Programmatically trigger a click to start the download
    link.click();
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(
      message || 'An error occurred while generating the invoice.'
    );
  }
};
