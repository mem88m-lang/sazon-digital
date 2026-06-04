import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sazon Digital — Análisis de Crecimiento para Restaurantes",
  description: "Descubra cuánto dinero está perdiendo su restaurante por problemas digitales que probablemente no conoce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.className}>
      <body className="min-h-screen bg-white text-[#0F1C2E]">{children}</body>
    </html>
  );
}
