"use client";

import React, { useEffect, useState } from "react";
import { AccountFooterProps } from "@/app/types";
import Image from "next/image";

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
}) => {
  const [coinPrices, setCoinPrices] = useState<{ [key: string]: number }>({});
  const [prevPrices, setPrevPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com:9443/stream?streams=" + blockchainSelected.map(coin => coin.toLowerCase() + "usdt@ticker").join('/'));

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const symbol = message.data.s.replace('USDT', '').toLowerCase();
      const price = parseFloat(message.data.c);
      setPrevPrices(prevPrices => ({
        ...prevPrices,
        [symbol]: coinPrices[symbol] || price
      }));
      setCoinPrices(prevPrices => ({
        ...prevPrices,
        [symbol]: price
      }));
    };

    return () => {
      socket.close();
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
    const valueInUSD = price ? (usdBalance) : 0;
    const amountInCrypto = price ? (usdBalance / price) : 0;

    return {
      name: coinName,
      balance: amountInCrypto,
      price: price,
      valueInUSD: valueInUSD,
    };
  });

  const sortedCoins = coinsWithBalances.sort((a, b) => b.valueInUSD - a.valueInUSD);

  const formatNumber = (num: number, decimalPlaces: number = 2) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'decimal', 
      minimumFractionDigits: decimalPlaces, 
      maximumFractionDigits: decimalPlaces 
    }).format(num);
  };

  return (
    <div className="px-2">
        <h3 className="py-2 text-xl font-semibold tracking-tight">Assets status</h3>
      {sortedCoins.map((coin, index) => (
        <div
          key={index}
          className={`flex items-center justify-between w-full px-2 py-2.5 backdrop-blur-xl dark:bg-white/[0.025] bg-black/[0.045] transition-colors mb-1.5 rounded-lg`}
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
              <span className="font-medium text-sm">
                {coinNameMap[coin.name.toLowerCase()]}
              </span>
              <span className="font-medium text-xs dark:text-white/50">
                {coin.name.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-[1px]">
            <div className="flex items-center gap-0.5 text-[11px]">
              <span className="font-medium text-[13px] tracking-tight">
                ${formatNumber(coin.valueInUSD, 2)} USD
              </span>
            </div>
            <span className="font-medium text-xs dark:text-white/50 tracking-tight">
              {formatNumber(coin.balance, 4)} {coin.name.toUpperCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountFooter;
