import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { AxiosOptions } from './AxiosOptions';

export async function FetchCall<T>( options: AxiosOptions = {}): Promise<T> {
    const defaultOptions: AxiosRequestConfig = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const axiosOptions: AxiosRequestConfig = { ...defaultOptions, ...options };
    try {
      const response = await axios(axiosOptions);
      const data = response as T;
      return data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        let errorResponse = {
            status: axiosError.response?.status,
            messages: axiosError.response?.data
        }
        return errorResponse as T
    }
  }