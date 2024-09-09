'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSession } from './getcurrentuser';

const Check = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserSession();
        if (!data) {
          router.push('/sign'); 
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
        router.push('/sign'); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return null; 
};

export default Check;
