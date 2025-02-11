import { User } from '../types/user';
import { Skeleton } from '@/components/ui/skeleton';

interface UserProfileProps {
  user: User | null;
  isLoading: boolean;
}

export const UserProfile = ({ user, isLoading }: UserProfileProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    );
  }

  if (!user) {
    return <p className="text-red-500">Failed to load user data.</p>;
  }

  return (
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
  );
};