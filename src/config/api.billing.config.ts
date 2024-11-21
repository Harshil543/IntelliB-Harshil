import storage from '@/utils/storage';
import axios from 'axios';
import toast from 'react-hot-toast';

const apiBillingClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BILLING_SERVICE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleUnauthorized = () => {
  storage.clearToken();
  window.location.href = '/login';
};

apiBillingClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiBillingClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response.data.message, {
      position: 'top-right'
    });
    if (error.response.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);

export default apiBillingClient;
