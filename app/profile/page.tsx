"use client";
import React, { useEffect, useState } from "react";
import { getUserSession } from "../libs/getcurrentuser";
import { User } from "../types";
import AccountHeader from "./ui/AccountHeader";
import SignOutButton from "../ui/signout";
import AccountFooter from "./ui/AccountFooter";
import Register from "../ui/signup";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [forAdmin, setForAdmin] = useState<string>("assets");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserSession();
        if (user) {
          setUserRole(user.role);
          setUser(user);
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
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

  const userTotalBalance: number =
    (user ? user.bnbBalance : 0) +
    (user ? user.btcBalance : 0) +
    (user ? user.ethBalance : 0) +
    (user ? user.solBalance : 0) +
    (user ? user.tonBalance : 0) +
    (user ? user.trxBalance : 0) +
    (user ? user.ltcBalance : 0);

  return (
    <div className="overflow-y-auto relative z-50 pb-20">
      <div>
        {user && (
          <>
            <AccountHeader
              userSystemActive={user.userSystemActive}
              passwordForUser={user.passwordForUser}
              userTotalBalance={userTotalBalance}
              userId={user.userId}
            />

            {userRole === "user" ? (
              <h3 className="py-2 text-xl font-semibold tracking-tight px-3">
                Assets status
              </h3>
            ) : (
              <div className="my-3 mx-2 grid grid-cols-3 dark:bg-white/10 bg-black/5 p-[3px] rounded-[8px]">
                <button
                  className={` rounded-md text-sm font-medium transition-all py-1 ${
                    forAdmin === "assets"
                      ? "dark:bg-white/20 bg-black/10"
                      : "dark:text-white"
                  }`}
                  onClick={() => setForAdmin("assets")}
                >
                  Assets
                </button>
                <button
                  className={` rounded-md text-sm font-medium transition-all py-1 ${
                    forAdmin === "register"
                      ? "dark:bg-white/20 bg-black/10"
                      : "dark:text-white"
                  }`}
                  onClick={() => setForAdmin("register")}
                >
                  Register
                </button>
                <button
                  className={` rounded-md text-sm font-medium transition-all py-1 ${
                    forAdmin === "users"
                      ? "dark:bg-white/20 bg-black/10"
                      : "dark:text-white"
                  }`}
                  onClick={() => setForAdmin("users")}
                >
                  Users
                </button>
              </div>
            )}
            {userRole === "user" && (
              <AccountFooter
                blockchainSelected={user.blockchainSelected}
                bnbBalance={user.bnbBalance}
                btcBalance={user.btcBalance}
                ethBalance={user.ethBalance}
                ltcBalance={user.ltcBalance}
                solBalance={user.solBalance}
                tonBalance={user.tonBalance}
                trxBalance={user.trxBalance}
              />
            )}
          </>
        )}
      </div>

      {userRole === "admin" && (
        <div className="mt-4">
          <AnimatePresence>
            {forAdmin === "assets" && (
              <motion.div
                key="assets"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.01, ease: "easeInOut" }}
              >
                {user && (
                  <AccountFooter
                    blockchainSelected={user.blockchainSelected}
                    bnbBalance={user.bnbBalance}
                    btcBalance={user.btcBalance}
                    ethBalance={user.ethBalance}
                    ltcBalance={user.ltcBalance}
                    solBalance={user.solBalance}
                    tonBalance={user.tonBalance}
                    trxBalance={user.trxBalance}
                  />
                )}
              </motion.div>
            )}
            {forAdmin === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.01, ease: "easeInOut" }}
              >
                <Register />
              </motion.div>
            )}
            {forAdmin === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.01, ease: "easeInOut" }}
              >
                Users
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-16">
        <SignOutButton />
      </div>
    </div>
  );
};

export default Profile;
