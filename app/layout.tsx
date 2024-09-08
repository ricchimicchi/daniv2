import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./providers/ThemeProvider";
import Footer from "./ui/footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const manrope = Inter({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`antialiased select-none ${manrope.className} w-full flex items-center justify-center h-screen bg-[#f4f4f4]`}
      >
        <ThemeProvider>
          <div className="bg-[#ffffff] dark:bg-[#080808] transition-all max-w-[25rem] w-full max-h-[38rem] h-full 1xl:max-h-full 1xl:max-w-full relative overflow-y-auto overflow-x-hidden">
            <main className="">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}