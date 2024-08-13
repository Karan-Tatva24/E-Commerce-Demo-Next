import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthRoutes from "@/app/AuthRoutes";

export const metadata: Metadata = {
  title: { template: "%s | Demo Kart", default: "Demo Kart" },
  description: "The official Next.js Course Dashboard, built with App Router.",
  authors: [{ name: "Karan Sarvaiya" }, { name: "Tatvasoft" }],
  keywords: ["Next.js", "Demo Kart", "Javascript", "React", "E-Commerce"],
  referrer: "origin-when-cross-origin",
  creator: "Karan Sarvaiya",
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  generator: "Next.js",
  applicationName: "Demo Kart",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <StoreProvider>
          <AuthRoutes>
            <Navbar />
            {children}
            <Footer />
          </AuthRoutes>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
