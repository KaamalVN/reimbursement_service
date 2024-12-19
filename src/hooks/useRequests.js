// src/hooks/useRequests.js
import { useQuery } from 'react-query';
import api from '../utils/api';

export const useRequests = () => {
  return useQuery('requests', () => api.get('/requests').then((res) => res.data));
};
