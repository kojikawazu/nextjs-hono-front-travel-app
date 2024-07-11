import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientHeader from "./Components/header/ClientHeader";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Web App",
  description: "Travel Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ClientHeader />
        {children}
      </body>
    </html>
  );
}
