import ky from "ky";
import { Card } from "../types";

export const getAllCards = (): Promise<Array<Card>> => {
  const API_URL = getApiUrl();
  return ky.get(`${API_URL}/cards`).json();
};

export const createCard = (payload: Card): Promise<any> => {
  const API_URL = getApiUrl();
  return ky.post(`${API_URL}/add`, { json: payload });
};

export const getApiUrl = (): string => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3003";
  } else {
    return "https://node11255.herokuapp.com";
  }
};
