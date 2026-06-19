import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
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
  title: "El Club del Gato Viajero · Stitch y las 5 playas secretas",
  description:
    "Acompaña a Stitch, un gato curioso y aventurero, en un recorrido ilustrado por cinco playas secretas del Caribe costarricense.",
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
        {children}
      </body>
    </html>
  );
}
