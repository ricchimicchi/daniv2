"use client";

import { getUserSession } from "@/app/libs/getcurrentuser";
import { User } from "@/app/types";
import SignOutButton from "@/app/ui/signout";
import { useEffect, useState } from "react";

const AccountLast = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserSession();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const userSystemTimeDays = user?.userSystemTime ? user.userSystemTime * 30 : 0;

  return (
    <div className="px-2">
      <div className="my-4 w-full h-[1px] dark:bg-white/10 bg-black/10" />
      <div className="py-3 flex items-center justify-between px-3 dark:bg-white/[0.02] bg-black/[0.08] backdrop-blur-xl rounded-md">
        <div className="flex flex-col items-start gap-0.5">
          <p className="text-xs font-medium">
            Account created Time: <span className="italic dark:text-white/60">{user?.createdAt.slice(0, 10)}</span>
          </p>
          <p className="text-xs font-medium">
            Active Time: <span className="dark:text-white/60">{userSystemTimeDays}</span> days
          </p>
        </div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default AccountLast;
