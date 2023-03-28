import Axios from 'axios';

import { API_URL } from '@/config';

import type { AxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: AxiosRequestConfig) {
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);
