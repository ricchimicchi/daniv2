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
  userSystemActive,
}) => {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [btcBalance, setBtcBalance] = useState<number | null>(null);
  const [balanceHidden, setBalanceHidden] = useState<boolean>(false);

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

  const formatNumber = (num: number, decimalPlaces: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    }).format(num);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full py-2.5 backdrop-blur-2xl px-2">
        <div>
          <h3 className="text-lg tracking-tight font-medium dark:text-[#e4e4e4]">
            Welcome{" "}
            <span className="text-normal font-semibold">
              {passwordForUser}{" "}
            </span>
            👋
          </h3>
          <div className="flex items-center gap-3 mt-0.5">
            <h3 className="text-xs tracking-tight font-medium dark:text-[#e4e4e4]">
              User ID: <span className="font-semibold">{userId}</span>
            </h3>
            <div className="flex items-center gap-1 dark:bg-green-200/5 bg-green-200/40 px-1.5 py-[3px] rounded-3xl">
              <div
                className={`circle_mm pulse ${
                  userSystemActive ? "green" : "red"
                }`}
              ></div>
              <span className="text-[8px] tracking-tight font-medium dark:text-[#e4e4e4]">
                {userSystemActive ? "Plan active" : "No active"}
              </span>
            </div>
          </div>
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
          <div className={`${space.className} text-3xl font-bold h-9`}>
            {balanceHidden ? (
              "*******"
            ) : (
              <>{btcBalance !== null ? formatNumber(btcBalance, 6) : "Loading..."}</>
            )}{" "}
            BTC
          </div>
          <div className={`text-xs font-medium h-4`}>
            {balanceHidden ? (
              "≈ *****"
            ) : (
              <div className="dark:text-white/60">
                <span className="text-sm">≈</span> $
                <span className="text-sm">
                  {userTotalBalance !== null ? formatNumber(userTotalBalance, 2) : "Loading..."}
                </span>
                <span> USDT</span>
              </div>
            )}
          </div>
        </div>
        <div className="my-6 h-px w-full bg-black/10 dark:bg-white/10"></div>
      </div>
    </div>
  );
};

export default AccountHeader;
