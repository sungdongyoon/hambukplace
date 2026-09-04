import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import QueryProvider from "@/provider/QueryProvider";
import AuthInitializer from "@/components/AuthInitializer";

export const metadata: Metadata = {
  title: "Hambuk Place",
  description:
    "햄버거에 진심인 사람이 만든 햄버거 지도입니다. 햄벅한 플레이스에서 다양한 햄버거 맛집을 찾아보세요!",
  icons: {
    icon: "/images/hambukplace-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-screen flex flex-col">
        <QueryProvider>
          <AuthInitializer />
          <Header />
          <main className="flex justify-center flex-1">
            {children}
            <Analytics />
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
