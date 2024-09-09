"use client";

import React, { useEffect, useState } from "react";
import { AccountHeaderProps } from "@/app/types";
import DarkToggle from "@/app/ui/darktoggle";
import { Space_Grotesk } from "next/font/google";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";

const space = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const AccountHeader: React.FC<AccountHeaderProps> = ({
  passwordForUser,
  userId,
  userTotalBalance,
}) => {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [btcBalance, setBtcBalance] = useState<number | null>(null);
  const [balanceHidden, setBalanceHidden] = useState<boolean | null>(false);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT"
        );
        const data = await response.json();
        setBtcPrice(parseFloat(data.lastPrice));
      } catch (error) {
        console.error("Error fetching BTC price:", error);
      }
    };

    fetchBtcPrice();
    const intervalId = setInterval(fetchBtcPrice, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (btcPrice !== null && userTotalBalance !== null) {
      setBtcBalance(userTotalBalance / btcPrice);
    }
  }, [btcPrice, userTotalBalance]);

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
          <h3 className="text-sm font-medium dark:text-[#e4e4e4] flex items-center gap-1">
            Estimated Total Assets:{" "}
            <button onClick={() => setBalanceHidden(!balanceHidden)}>
              {balanceHidden ? <PiEyeClosedBold /> : <PiEyeBold />}
            </button>
          </h3>
          <div className={`${space.className} text-3xl font-bold`}>
            {balanceHidden ? (
              "*******"
            ) : (
              <>{btcBalance !== null ? btcBalance.toFixed(6) : "Loading..."}</>
            )}{" "}
            BTC
          </div>
          <div className={`text-xs font-medium`}>
            {balanceHidden ? (
              "*****"
            ) : (
              <>
                <span className="text-sm">≈</span> $
                {userTotalBalance.toFixed(2)}
                USD
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
