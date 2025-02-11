'use client'

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/features/user/types/user';
import { UserService } from '@/features/user/services/userService';


export default function UserPage() {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hàm fetch user data
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const data = await UserService.getCurrentUser();
      setUser(data);
    } catch (error) {
      toast({
        title: 'Error fetching user data',
        description: error.response?.data?.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load user data.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <img
          src={user.image}
          alt={`${user.username}'s profile`}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600">@{user.username}</p>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600 capitalize">{user.gender}</p>
      </div>
    </div>
  );
}