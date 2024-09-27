import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://www.eternalrestfulfuneralservices.com/api',
});

export const instanceFile = axios.create({
  baseURL: 'https://www.eternalrestfulfuneralservices.com/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});