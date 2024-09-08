'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSession } from '../libs/getcurrentuser';
import SignOutButton from '../ui/signout';
import { User } from '../types';


const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserSession();
      if (data) {
        setUser(data);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>User ID:</strong> {user.userId}</p>
          <p><strong>Main Password:</strong> {user.passwordForUser}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <SignOutButton />
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
