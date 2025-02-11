'use client';

import { UserProfile } from "@/features/user/components";
import { useUser } from "@/features/user/hooks";
import { useToast } from "@/hooks/use-toast";


export default function UserPage() {
  const { user, isLoading, error } = useUser();
  const { toast } = useToast();

  if (error) {
    toast({
      title: 'Error',
      description: error,
      variant: 'destructive',
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <UserProfile user={user} isLoading={isLoading} />
    </div>
  );
}