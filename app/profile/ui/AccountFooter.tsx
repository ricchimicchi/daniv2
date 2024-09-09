"use client";

import React, { useEffect, useState } from "react";
import { AccountFooterProps } from "@/app/types";
import Image from "next/image";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const coinNameMap: { [key: string]: string } = {
  btc: "Bitcoin",
  bnb: "Binance Coin",
  eth: "Ethereum",
  ltc: "Litecoin",
  sol: "Solana",
  ton: "Toncoin",
  trx: "Tron",
};

const fetchCoinPrices = async (symbols: string[]) => {
  const response = await fetch(
    `https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbols.map(s => `"${s}"`).join(',')}]`
  );
  const data = await response.json();
  return data.reduce((acc: { [key: string]: number }, coin: any) => {
    acc[coin.symbol.replace('USDT', '').toLowerCase()] = parseFloat(coin.lastPrice);
    return acc;
  }, {});
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
    const fetchPrices = async () => {
      const symbols = blockchainSelected.map(coin => coin.toUpperCase() + 'USDT');
      const prices = await fetchCoinPrices(symbols);
      setPrevPrices(coinPrices); 
      setCoinPrices(prices);
    };
    
    fetchPrices();
    const intervalId = setInterval(fetchPrices, 1000); 

    return () => clearInterval(intervalId); 
  }, [blockchainSelected, coinPrices]);

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
    const balance = balanceMap[lowerCaseName] ?? 0;
    const price = coinPrices[lowerCaseName] ?? 0;
    const prevPrice = prevPrices[lowerCaseName] ?? price;
    const valueInUSD = price ? (balance * price) : 0;
    const priceChange = prevPrice ? ((price - prevPrice) / prevPrice) * 100 : 0;
    const priceChangeDirection = priceChange > 0 ? 'up' : 'down';
    
    return {
      name: coinName,
      balance,
      price,
      valueInUSD,
      priceChange: priceChange.toFixed(2),
      priceChangeDirection,
    };
  });

  const sortedCoins = coinsWithBalances.sort((a, b) => b.valueInUSD - a.valueInUSD);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'decimal', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }).format(num);
  };

  return (
    <div className="px-2">
      {sortedCoins.map((coin, index) => (
        <div
          key={index}
          className={`flex items-center justify-between w-full p-2 backdrop-blur-xl dark:bg-white/[0.025] bg-black/[0.045] transition-colors mb-1.5 rounded-xl`}
        >
          <div className="flex items-center gap-3">
            <Image
              src={`/coins/${coin.name.slice(0, 3).toUpperCase()}.svg`}
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
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-xs font-medium">
              <span>
                ${formatNumber(coin.valueInUSD)} USD
              </span>
              <span className="flex items-center">
                {coin.priceChangeDirection === 'up' ? (
                  <FaArrowUp className="text-green-500" />
                ) : (
                  <FaArrowDown className="text-red-500" />
                )}
              </span>
            </div>
            <span className="font-semibold">
              {formatNumber(coin.balance)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountFooter;
