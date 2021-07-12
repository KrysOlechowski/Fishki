import ky from "ky";
import { Login } from "../types/auth-types";
import { getApiUrl } from "./api";

export const login = (payload: Login): Promise<any> => {
  const API_URL = getApiUrl();
  return ky.post(`${API_URL}/login`, { json: payload }).json();
};

export const logout = (cookieId: string): Promise<any> => {
  const API_URL = getApiUrl();
  const payload = {
    cookieId: cookieId,
  };
  return ky.post(`${API_URL}/logout`, { json: payload }).json();
};

export const checkSessionInMongo = (cookieId: string): Promise<any> => {
  const API_URL = getApiUrl();
  const payload = {
    cookie: cookieId,
  };
  return ky.post(`${API_URL}/session`, { json: payload }).json();
};
