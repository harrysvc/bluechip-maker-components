/* eslint-disable camelcase */
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const __DEV__ = process.env.NODE_ENV === 'development';

const ConnectionInstance = Axios.create({
  timeout: 20000,
});

export const setToken = (token: string) => {
  ConnectionInstance.defaults.headers = {
    ...ConnectionInstance.defaults.headers,
    options: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const clearToken = () => {
  delete ConnectionInstance.defaults.headers.options?.Authorization;
};

ConnectionInstance.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => requestConfig,
  (error: AxiosError) => {
    if (__DEV__) {
      console.error('API Request Error:', error);
    }
    return Promise.reject(error);
  },
);

ConnectionInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Try to find the access token from response
    if (response.data?.token?.accessToken) {
      ConnectionInstance.defaults.headers = {
        ...ConnectionInstance.defaults.headers,
        options: {
          Authorization: `Bearer ${response.data?.token?.accessToken}`,
        },
      };
    }
    return response;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error('API Response Error:', error);
    }

    return Promise.reject(error);
  },
);

export default ConnectionInstance;
