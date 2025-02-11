import { useEffect, useState } from 'react';
import { User } from '../types/user';
import { UserService } from '../services/userService';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await UserService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, isLoading, error };
};