import apiClient from '@/lib/api/client';
import { User } from '../types/user';



export const UserService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

}