import axios from 'axios';
import { config } from '@/config';

export const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

api.interceptors.request.use((reqConfig) => {
  if (['post', 'patch', 'put'].includes(reqConfig.method ?? '')) {
    reqConfig.headers.set('Content-Type', 'application/json');
  }

  return reqConfig;
});
