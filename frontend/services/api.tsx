import axios from 'axios';

const API_URL = 'https://localhost:7048/api/';

export const fetchMonuments = async () => {
  const response = await axios.get(`${API_URL}MyEntities/monuments`);
  return response.data;
};

export const fetchMonumentById = async (id: string | string[]) => {
  const response = await axios.get(`${API_URL}MyEntities/monuments/${id}`);
  return response.data;
};

export const fetchTouristPlaces = async () => {
  const response = await axios.get(`${API_URL}MyEntities/touristplaces`);
  return response.data;
};

export const fetchMonumentData = async () => {
  const response = await axios.get(`${API_URL}MyEntities/monumentdata`);
  return response.data;
};

export const fetchMonumentBySearch = async (query: any) => {
  const response = await axios.get(`${API_URL}MyEntities/search?query=${query}`);
  return response.data;
};

export const signup = async (email: { name: string; email: string; password: string; }, passwordHash: undefined) => {
  const response = await axios.post(`${API_URL}Account/signup`, {
    email,
    passwordHash
  });
  return response.data;
};

export const login = async (email: { email: string; password: string; }, passwordHash: undefined) => {
  const response = await axios.post(`${API_URL}Account/login`, {
    email,
    passwordHash
  });
  return response.data;
};
