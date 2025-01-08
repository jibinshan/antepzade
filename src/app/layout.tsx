import "@/styles/globals.css";
import "@/styles/ham.css"

import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import { Josefin_Sans, Poppins, Baskervville, Italiana, Inter } from "next/font/google";
import Providers from "@/app/Providers";

export const metadata: Metadata = {
  title: "Antepzade",
  description:
    "Welcome to Antepzade, Where Every Moment Sparkles in North London",
  icons: [{ rel: "icon", url: "/images/logo.png" }],
};

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin_sans",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "300", "400", "500", "700", "900"],
});

const baskerville = Baskervville({
  subsets: ["latin"],
  variable: "--font-baskerville",
  weight: ["400"],
});

const italiana = Italiana({
  subsets: ["latin"],
  variable: "--font-italiana",
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "theme-custom flex min-h-screen font-josefin_sans antialiased",
          josefin_sans.variable,
          poppins.variable,
          inter.variable,
          baskerville.variable,
          italiana.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html >
  );
}
