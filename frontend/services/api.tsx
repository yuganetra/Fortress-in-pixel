import axios from 'axios';
import { cwd } from 'process';

const API_URL = 'https://localhost:7048/api/';

export const fetchMonuments = async () => {
  const response = await axios.get(`${API_URL}MyEntities/monuments`);
  return response.data;
};

export const fetchMonumentById = async (id: any) => {
  const response = await axios.get(`${API_URL}MyEntities/monuments/${id}`);
  return response.data;
};
export const fetchTouristPlaces = async () => {
  const response = await axios.get(`${API_URL}MyEntities/touristplaces`);
  return response.data;
};
export const fetchmonumentdata = async () => {
  const response = await axios.get(`${API_URL}MyEntities/monumentdata`);
  return response.data;
};
export const fetchmonumentBySearch = async (query:string) => {
  const response = await axios.get(`${API_URL}MyEntities/search?query=${query}`);
  console.log(response.data);
  return response.data;
};
