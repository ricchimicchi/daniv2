"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import DarkToggle from "./darktoggle";
import CryptoAnimation from "./signanimation";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { getUserSession } from "../libs/getcurrentuser";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

const space = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface FormValues {
  keyInput: string;
}

const Signpage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const checkSession = async () => {
      const userSession = await getUserSession();
      if (userSession) {
        router.push("/");
      } else {
        setSessionChecked(true);
      }
    };

    checkSession();
  }, [router]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: data.keyInput }),
      });

      if (response.ok) {
        toast.success("Giriş başarılı");
        router.push("/profile");
      } else {
        const errorData = await response.json();
        toast.error(`Giriş başarısız: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      toast.error("Giriş hatası");
    } finally {
      setLoading(false);
    }
  };

  if (!sessionChecked) {
    return (
      <div className="h-screen flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 56 56"
          fill="none"
          className="animate-spin mr-2"
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
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        src={"/blueel.svg"}
        width={2000}
        height={2000}
        alt="ellipse"
        className="absolute -top-0 -left-10 scale-[2.3] -rotate-[17deg] dark:opacity-55"
      />
      <div className="absolute top-3 right-3">
        <DarkToggle />
      </div>

      <div className="absolute top-24 inset-x-0 flex flex-col items-center justify-center gap-6">
        <div className="flex justify-center gap-1">
          <h1 className={`${space.className} text-xl font-bold uppercase`}>
            Dani Soft
          </h1>
          <span
            className={`text-[8px] ${space.className} font-medium mt-2.5 block`}
          >
            (v2.0)
          </span>
        </div>
        <CryptoAnimation />
      </div>
      <div className={`absolute inset-x-0 top-52 px-4 ${space.className}`}>
        <div className="text-center">
          <h3 className={`text-2xl font-bold tracking-tight `}>Sign in</h3>
          <p className="text-[#7c7c7c]">Enter your credentials</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-3 w-full mt-3"
        >
          <input
            type="text"
            placeholder="Activation Key"
            disabled={loading}
            {...register("keyInput", {
              required: "Please enter your activation key",
            })}
            className={`p-2 px-3 text-center dark:placeholder:text-white/50 placeholder:text-sm font-medium tracking-wide ${space.className} outline-black/5 outline-1 transition-all dark:outline-none dark:text-white border-[1px] dark:border-white/5 dark:bg-white/[0.01] bg-black/[0.03] backdrop-blur w-full rounded-lg`}
          />
          {errors.keyInput && (
            <p className="text-red-500 text-xs text-center font-medium -mt-1.5 mx-0.5">
              {errors.keyInput.message}
            </p>
          )}

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

        <p className="text-sm font-medium dark:text-[#7c7c7c] mt-2 text-center flex items-center gap-2 justify-center">
          {" "}
          {loading ? (
            "This process might take 1 or 2 minutes"
          ) : (
            <>
              Doesn't have activate Key?{" "}
              <Link
                href={"/"}
                target="_blank"
                className="flex items-center gap-1 underline dark:text-white"
              >
                Buy <MdOutlineArrowOutward />
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Signpage;
