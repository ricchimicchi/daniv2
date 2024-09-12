"use client";

import { useForm, SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegTrashAlt } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { wordsList } from "../datas/list";
import Image from "next/image";
import { TbReload } from "react-icons/tb";

interface FormValues {
  userId: string;
  password: string;
  passwordForUser?: string;
  role: "user" | "admin";
  checkWalletCount: number;
  userSystemTime: number;
  blockchainSelected: string[];
  bnbBalance: number;
  btcBalance: number;
  solBalance: number;
  ethBalance: number;
  tonBalance: number;
  trxBalance: number;
  ltcBalance: number;
  freezeCodes: {
    [key: string]: string;
  };
}

const generateFreezeCode = (numWords: number): string => {
  const shuffledWords = wordsList.sort(() => 0.5 - Math.random());
  return shuffledWords.slice(0, numWords).join(" ");
};

const refreshFreezeCode = (
  blockchain: string,
  setValue: UseFormSetValue<FormValues>
) => {
  const newCode = generateFreezeCode(12);
  setValue(`freezeCodes.${blockchain}`, newCode);
};

const clearFreezeCode = (
  blockchain: string,
  setValue: UseFormSetValue<FormValues>
) => {
  setValue(`freezeCodes.${blockchain}`, "");
};

export default function Register() {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      role: "user",
      freezeCodes: {
        bnb: generateFreezeCode(12),
        btc: generateFreezeCode(12),
        sol: generateFreezeCode(12),
        eth: generateFreezeCode(12),
        ton: generateFreezeCode(12),
        trx: generateFreezeCode(12),
        ltc: generateFreezeCode(12),
      },
    },
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedBlockchains, setSelectedBlockchains] = useState<Set<string>>(
    new Set()
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedSystemTime, setSelectedSystemTime] = useState<number | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(false);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = {
      ...data,
      userSystemTime: selectedSystemTime ?? 0,
      freezeCodes: Object.fromEntries(
        Object.entries(data.freezeCodes).filter(([key]) =>
          selectedBlockchains.has(key)
        )
      ),
    };

    try {
      setLoading(true);
      setApiError(null);
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error registering user");
      }

      alert("User registered successfully");
    } catch (error) {
      console.error("Error during registration:");
      setApiError("Error registering user");
    } finally {
      setLoading(false);
    }
  };

  const toggleBlockchain = (blockchain: string) => {
    setSelectedBlockchains((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(blockchain)) {
        newSet.delete(blockchain);
        setValue(`freezeCodes.${blockchain}`, "");
      } else {
        newSet.add(blockchain);
      }
      setValue("blockchainSelected", Array.from(newSet));
      return newSet;
    });
  };

  const blockchainNames = ["bnb", "btc", "ltc", "sol", "trx", "ton", "eth"];

  return (
    <div className="px-2 w-full">
      <h1 className="text-xl font-semibold tracking-tight">
        New User Register
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-3">
        <div className="grid grid-cols-2">
          <div className="mb-2">
            <input
              type="number"
              className="px-2 py-2 w-full rounded-tl-md rounded-bl-md outline-none dark:focus:bg-white/[0.01] dark:bg-white/[0.03] focus:bg-black/[0.12] bg-black/[0.08] backdrop-blur-xl transition-colors placeholder:text-sm placeholder:font-semibold dark:placeholder:text-white/50 placeholder:text-black/60 font-semibold"
              autoComplete="off"
              placeholder="User ID"
              {...register("userId", { required: "User ID is required" })}
            />
          </div>
          <div className="mb-2 flex items-center justify-between w-full px-3 rounded-tr-md rounded-br-md dark:bg-white/[0.03] bg-black/[0.08] py-2.5 backdrop-blur-xl">
            <span className="text-sm font-semibold block dark:text-white/50 text-black/60">
              Role
            </span>
            <Switch
              checked={isAdmin}
              onChange={(checked) => {
                setIsAdmin(checked);
                setValue("role", checked ? "admin" : "user");
              }}
              className={`relative flex h-5 w-10 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
                isAdmin ? "bg-blue-500" : "dark:bg-white/10 bg-black/20"
              }`}
            >
              <span
                aria-hidden="true"
                className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isAdmin ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </Switch>
          </div>
        </div>

        <div className="mb-2">
          <input
            type="password"
            className="px-2 py-2 w-full rounded-md outline-none dark:focus:bg-white/[0.01] dark:bg-white/[0.03] focus:bg-black/[0.12] bg-black/[0.08] backdrop-blur-xl transition-colors placeholder:text-sm placeholder:font-semibold dark:placeholder:text-white/50 placeholder:text-black/60 font-semibold"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
        </div>

        <div className="mb-2">
          <input
            type="text"
            className="px-2 py-2 w-full rounded-md outline-none dark:focus:bg-white/[0.01] dark:bg-white/[0.03] focus:bg-black/[0.12] bg-black/[0.08] backdrop-blur-xl transition-colors placeholder:text-sm placeholder:font-semibold dark:placeholder:text-white/50 placeholder:text-black/60 font-semibold"
            autoComplete="off"
            placeholder="Password For User"
            {...register("passwordForUser")}
          />
        </div>

        <div className="mb-2">
          <input
            type="number"
            className="px-2 py-2 w-full rounded-md outline-none dark:focus:bg-white/[0.01] dark:bg-white/[0.03] focus:bg-black/[0.12] bg-black/[0.08] backdrop-blur-xl transition-colors placeholder:text-sm placeholder:font-semibold dark:placeholder:text-white/50 placeholder:text-black/60 font-semibold"
            autoComplete="off"
            placeholder="Check Wallet Count"
            {...register("checkWalletCount", {
              required: "Check Wallet Count is required",
            })}
          />
        </div>

        <div className="mb-2 grid grid-cols-6 gap-[6px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => setSelectedSystemTime(Number(value))}
              className={`p-2 rounded-md backdrop-blur-xl text-sm font-semibold ${
                selectedSystemTime === Number(value)
                  ? "dark:bg-white/[0.20] bg-black/[0.99] text-white"
                  : "dark:bg-white/[0.03] bg-black/[0.08]"
              } transition-colors`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="my-4 w-full h-[1px] dark:bg-white/10 bg-black/10" />

        <div className="mb-1.5 grid grid-cols-7 gap-[5px]">
          {blockchainNames.map((blockchain) => (
            <button
              type="button"
              key={blockchain}
              onClick={() => toggleBlockchain(blockchain)}
              className={`p-2 flex items-center justify-center rounded-md ${
                selectedBlockchains.has(blockchain)
                  ? "dark:bg-white/[0.20] bg-black/[0.99]"
                  : "dark:bg-white/[0.03] bg-black/[0.08]"
              }`}
            >
              <Image
                src={`/coins/${blockchain}.svg`}
                height={20}
                width={20}
                alt="coin_images"
              />
            </button>
          ))}
        </div>

        <AnimatePresence>
          {blockchainNames.map((blockchain) => (
            <motion.div
              key={blockchain}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: selectedBlockchains.has(blockchain) ? "auto" : 0,
                opacity: selectedBlockchains.has(blockchain) ? 1 : 0,
              }}
              exit={{ height: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {selectedBlockchains.has(blockchain) && (
                <>
                  <input
                    type="number"
                    className="px-2 py-1.5 text-xs w-full mb-1.5 rounded-md outline-none dark:focus:bg-white/[0.01] dark:bg-white/[0.03] focus:bg-black/[0.12] bg-black/[0.08] backdrop-blur-xl transition-colors placeholder:text-xs placeholder:font-semibold dark:placeholder:text-white/50 placeholder:text-black/60 font-semibold"
                    autoComplete="off"
                    step={0.0001}
                    placeholder={`${blockchain.toUpperCase()} Balance`}
                    {...register(`${blockchain}Balance` as const)}
                  />
                  <div className="flex items-center mb-2 gap-1">
                    <input
                      type="text"
                      className="px-2 py-2 w-full rounded-md outline-none dark:focus:bg-white/[0.01] dark:bg-white/[0.03] focus:bg-black/[0.12] bg-black/[0.08] backdrop-blur-xl transition-colors text-xs placeholder:font-semibold dark:placeholder:text-white/50 placeholder:text-black/60 font-medium"
                      autoComplete="off"
                      placeholder={`${blockchain.toUpperCase()} Freeze Code`}
                      value={watch(`freezeCodes.${blockchain}`)}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() => refreshFreezeCode(blockchain, setValue)}
                      className="p-1.5 rounded-md bg-black/[0.10] dark:bg-white/[0.03]"
                    >
                      <TbReload size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => clearFreezeCode(blockchain, setValue)}
                      className="p-1.5 rounded-md bg-black/[0.10] dark:bg-white/[0.03]"
                    >
                      <FaRegTrashAlt size={19} />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="my-4 w-full h-[1px] dark:bg-white/10 bg-black/10" />

        <button
          type="submit"
          className="bg-black/90 dark:bg-white/5 text-white py-2 px-4 rounded-lg w-full font-medium flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 56 56"
              fill="none"
              className="animate-spin mr-2"
            >
              <path
                d="M36.639 5.609C39.5795 6.74345 42.2677 8.44596 44.5502 10.6193C46.8327 12.7927 48.6648 15.3944 49.9419 18.2758C51.2189 21.1572 51.9159 24.2619 51.9931 27.4127C52.0703 30.5635 51.5261 33.6986 50.3916 36.6391C49.2572 39.5795 47.5547 42.2678 45.3813 44.5503C43.2079 46.8328 40.6063 48.6649 37.7249 49.9419C34.8435 51.219 31.7387 51.916 28.5879 51.9932C25.4372 52.0703 22.302 51.5261 19.3616 50.3917C16.4211 49.2572 13.7329 47.5547 11.4503 45.3814C9.16784 43.208 7.33576 40.6063 6.05871 37.7249C4.78166 34.8435 4.08465 31.7388 4.00748 28.588C3.93031 25.4372 4.47448 22.3021 5.60894 19.3616C6.74339 16.4211 8.4459 13.7329 10.6193 11.4504C12.7926 9.1679 15.3943 7.33582 18.2757 6.05877C21.1571 4.78172 24.2618 4.08471 27.4126 4.00754C30.5634 3.93037 33.6985 4.47454 36.639 5.609L36.639 5.609Z"
                strokeWidth="8"
                className="stroke-white/20 dark:stroke-white/10"
              />
              <path
                d="M36.639 5.609C41.3676 7.43332 45.3973 10.7078 48.1505 14.9631"
                strokeWidth="8"
                strokeLinecap="round"
                className="stroke-white"
              />
            </svg>
          )}
          {loading ? "" : "Continue"}
        </button>
      </form>
      {apiError && <div className="mt-4 text-red-500">{apiError}</div>}
    </div>
  );
}
