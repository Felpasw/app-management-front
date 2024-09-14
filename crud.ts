import axiosInstance from './axios';
import { AxiosResponse } from 'axios';

const get = async (route: string, params?: object) => {
  const response: AxiosResponse = await axiosInstance.get(route, { params }).catch((response) => {
    return response;
  });
  return response.data;
};

const insert = async (route: string, object: object) => {
  const response: AxiosResponse = await axiosInstance.post(route, object).catch((response) => {
    return response;
  });
  return response.status;
};

const update = async (route: string, object: object, id: string) => {
  const response: AxiosResponse = await axiosInstance.post(`${route}/${id}`, object).catch((response) => {
    return response;
  });
  return response.data;
};

const remove = async (route: string, id: string) => {
  const response: AxiosResponse = await axiosInstance.delete(`${route}/${id}`).catch((response) => {
    return response;
  });
  return response.status;
};

export { get, insert, update, remove };
