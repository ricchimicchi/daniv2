'use client';

import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const handleSignOut = async () => {
    try {
      await fetch(`${BASE_URL}/api/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      router.push('/sign');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
