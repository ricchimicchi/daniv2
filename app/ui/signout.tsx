'use client';
import React, { useState } from 'react';
import { HiLogout } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const handleSignOut = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="h-7 px-2 flex items-center justify-center rounded-md text-xs font-medium border-[1px] border-black/20 dark:border-white/20 backdrop-blur-lg relative"
      onClick={handleSignOut}
    >
      {loading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 56 56"
          fill="none"
          className="animate-spin"
        >
          <path
            d="M36.639 5.609C39.5795 6.74345 42.2677 8.44596 44.5502 10.6193C46.8327 12.7927 48.6648 15.3944 49.9419 18.2758C51.2189 21.1572 51.9159 24.2619 51.9931 27.4127C52.0703 30.5635 51.5261 33.6986 50.3916 36.6391C49.2572 39.5795 47.5547 42.2678 45.3813 44.5503C43.2079 46.8328 40.6063 48.6649 37.7249 49.9419C34.8435 51.219 31.7387 51.916 28.5879 51.9932C25.4372 52.0703 22.302 51.5261 19.3616 50.3917C16.4211 49.2572 13.7329 47.5547 11.4503 45.3814C9.16784 43.208 7.33576 40.6063 6.05871 37.7249C4.78166 34.8435 4.08465 31.7388 4.00748 28.588C3.93031 25.4372 4.47448 22.3021 5.60894 19.3616C6.74339 16.4211 8.4459 13.7329 10.6193 11.4504C12.7926 9.1679 15.3943 7.33582 18.2757 6.05877C21.1571 4.78172 24.2618 4.08471 27.4126 4.00754C30.5634 3.93037 33.6985 4.47454 36.639 5.609L36.639 5.609Z"
            strokeWidth="8"
            className="stroke-black/20 dark:stroke-white/10"
          />
          <path
            d="M36.639 5.609C41.3676 7.43332 45.3973 10.7078 48.1505 14.9631"
            strokeWidth="8"
            strokeLinecap="round"
            className="stroke-black dark:stroke-white"
          />
        </svg>
      ) : (
        <div className='flex items-center gap-2'>
          <HiLogout size={13} />
        </div>
      )}
    </button>
  );
};

export default SignOutButton;
