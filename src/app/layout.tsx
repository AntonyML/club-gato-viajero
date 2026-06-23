import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "El Club del Gato Viajero · Melvin Ramón y las 5 playas secretas",
  description:
    "Acompaña a Melvin Ramón, un gato curioso y aventurero, en un recorrido ilustrado por cinco playas secretas del Caribe costarricense. Tours guiados con la mejor mascota del Caribe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${nunito.variable} h-full`}
    >
      <body className="min-h-full paper-bg font-body text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
