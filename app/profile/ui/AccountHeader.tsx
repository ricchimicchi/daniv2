"use client";

import { AccountHeaderProps } from "@/app/types";
import DarkToggle from "@/app/ui/darktoggle";
import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
  });

const AccountHeader: React.FC<AccountHeaderProps> = ({
  passwordForUser,
  userId,
  userTotalBalance,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full py-2.5 backdrop-blur-2xl px-2">
        <div>
          <h3 className="text-lg tracking-tight font-medium dark:text-[#e4e4e4]">
            Welcome{" "}
            <span className="text-normal font-semibold">{passwordForUser}</span>
            👋
          </h3>
          <h3 className="text-xs tracking-tight font-medium dark:text-[#e4e4e4]">
            User ID: <span className="font-semibold">{userId}</span>
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <DarkToggle />
        </div>
      </div>
      <div className="pt-5 px-2">
        <div>
          <h3 className="text-sm font-medium dark:text-[#e4e4e4]">
            Total Balance:
          </h3>
          <div className={`${space.className} text-3xl font-bold`}>${userTotalBalance}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
