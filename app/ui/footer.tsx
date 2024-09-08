"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerLinks } from "../datas/footerLinks";

const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/sign") {
    return null;
  }

  return (
    <footer className="absolute 1xl:fixed bottom-0 h-[3.5rem] dark:bg-[#0c0b0b] transition-all bg-[#f2f2f2] w-full grid grid-cols-4 p-1.5">
      {footerLinks.map((e, i) => (
        <Link
          key={i}
          href={e.href}
          className={`flex items-center justify-center rounded-lg ${
            pathname === e.href ? "dark:bg-[#100f0f] bg-[#e0e0e0]" : ""
          } transition-all`}
        >
          <span className="dark:text-white text-black transition-all">
            {e.icon}
          </span>
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
