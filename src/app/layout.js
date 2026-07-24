import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import NavbarPage from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillSwap — Freelance Micro-Task Platform",
  description: "Connect with top freelancers or post micro-tasks with instant Stripe checkout.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NavbarPage />
        <main className="flex-1">{children}</main>
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
