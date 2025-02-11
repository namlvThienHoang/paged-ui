// src/modules/user/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  // return context;
  return {
    isAdmin: context?.user?.email === 'admin',
    isCustomer: context?.user?.email === 'customer',
    context,
  };
}
