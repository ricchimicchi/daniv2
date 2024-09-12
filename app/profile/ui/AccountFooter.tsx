/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { AccountFooterProps } from "@/app/types";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const space = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const coinNameMap: { [key: string]: string } = {
  btc: "Bitcoin",
  bnb: "Binance Coin",
  eth: "Ethereum",
  ltc: "Litecoin",
  sol: "Solana",
  ton: "Toncoin",
  trx: "Tron",
};

const AccountFooter: React.FC<AccountFooterProps> = ({
  blockchainSelected,
  btcBalance,
  bnbBalance,
  ethBalance,
  ltcBalance,
  solBalance,
  tonBalance,
  trxBalance,
  freezeCodes,
}) => {
  const [coinPrices, setCoinPrices] = useState<{ [key: string]: number }>({});
  const [prevPrices, setPrevPrices] = useState<{ [key: string]: number }>({});
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const responses = await Promise.all(
          blockchainSelected.map((coin) =>
            fetch(
              `https://api.binance.com/api/v3/ticker/price?symbol=${coin.toUpperCase()}USDT`
            )
          )
        );

        const data = await Promise.all(responses.map((res) => res.json()));

        const newPrices = data.reduce(
          (acc: { [key: string]: number }, item: any) => {
            const symbol = item.symbol.replace("USDT", "").toLowerCase();
            acc[symbol] = parseFloat(item.price);
            return acc;
          },
          {}
        );

        setPrevPrices((prevPrices) => ({
          ...prevPrices,
          ...Object.fromEntries(
            Object.entries(newPrices).map(([key, price]) => [
              key,
              coinPrices[key] || price,
            ])
          ),
        }));
        setCoinPrices(newPrices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();

    const intervalId = setInterval(fetchPrices, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [blockchainSelected]);

  const balanceMap: { [key: string]: number } = {
    btc: btcBalance,
    bnb: bnbBalance,
    eth: ethBalance,
    ltc: ltcBalance,
    sol: solBalance,
    ton: tonBalance,
    trx: trxBalance,
  };

  const coinsWithBalances = blockchainSelected.map((coinName) => {
    const lowerCaseName = coinName.toLowerCase();
    const usdBalance = balanceMap[lowerCaseName] ?? 0;
    const price = coinPrices[lowerCaseName] ?? 0;
    const prevPrice = prevPrices[lowerCaseName] ?? price;
    const amountInCrypto = price ? usdBalance / price : 0;
    const valueInUSD = price ? usdBalance : 0;

    return {
      name: coinName,
      balance: amountInCrypto,
      price: price,
      valueInUSD: valueInUSD,
      freezeCodes: freezeCodes[lowerCaseName] || "No freeze codes available",
    };
  });

  const sortedCoins = coinsWithBalances.sort(
    (a, b) => b.valueInUSD - a.valueInUSD
  );

  const formatNumber = (num: number, decimalPlaces: number = 2) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(num);
  };

  const handleAccordionToggle = (coinName: string) => {
    setOpenAccordion(openAccordion === coinName ? null : coinName);
  };

  return (
    <div className="px-2">
      {sortedCoins.map((coin, index) => (
        <div
          key={index}
          className={`flex flex-col w-full px-2 py-2.5 backdrop-blur-xl dark:bg-white/[0.025] bg-black/[0.045] transition-colors mb-1.5 rounded-lg`}
        >
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleAccordionToggle(coin.name)}
          >
            <div className="flex items-center gap-3">
              <Image
                src={`/coins/${coin.name.slice(0, 3).toLowerCase()}.svg`}
                width={32}
                height={32}
                alt="coin_image"
                className="pointer-events-none"
              />
              <div className="flex flex-col items-start gap-[1px]">
                <span
                  className={`${space.className} font-semibold tracking-tight text-sm`}
                >
                  {coinNameMap[coin.name.toLowerCase()]}
                </span>
                <span
                  className={`${space.className} font-medium text-xs dark:text-white/50`}
                >
                  {coin.name.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-[1px]">
                <div className="flex items-center gap-0.5 text-[11px]">
                  <span
                    className={`${space.className} font-semibold text-[13px] tracking-tight`}
                  >
                    ${formatNumber(coin.valueInUSD, 2)} USD
                  </span>
                </div>
                <span className="font-medium text-xs dark:text-white/50 tracking-tight">
                  {formatNumber(coin.balance, 4)} {coin.name.toUpperCase()}
                </span>
              </div>
              <div className="h-8 w-[1px] dark:bg-white/20 bg-black/20" />
              <div className="text-lg -ml-1 mr-2">
                <FaChevronUp
                  className={`trs_ml ${
                    openAccordion === coin.name ? "rotate-0" : "-rotate-180"
                  }`}
                />
              </div>
            </div>
          </div>
          <AnimatePresence>
            {openAccordion === coin.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                <div className="flex items-center gap-2 py-1 overflow-x-hidden">
                  <span className="font-medium text-sm tracking-tight text-nowrap">
                    {formatNumber(coin.balance, 4)} {coin.name.toUpperCase()}
                  </span>

                  <span
                    className={`font-medium text-sm tracking-tight text-nowrap`}
                  >
                    ${formatNumber(coin.valueInUSD, 2)}
                  </span>
                  <span className="block mb-0.5">•</span>
                  <p className="text-xs font-medium text-nowrap dark:text-white/60 text-black/60">{coin.freezeCodes}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default AccountFooter;
