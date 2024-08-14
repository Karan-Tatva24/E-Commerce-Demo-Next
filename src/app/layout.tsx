import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/providers/AuthProvider";
import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider";

export const metadata: Metadata = {
  title: { template: "%s | Demo Kart", default: "Demo Kart" },
  description: "This is Demo Kart shopping web app create using Next JS",
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
          <ReactQueryClientProvider>
            <AuthProvider>
              <Navbar />
              <main className="min-h-[calc(100% - 176px)]">{children}</main>
              <Footer />
            </AuthProvider>
          </ReactQueryClientProvider>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
