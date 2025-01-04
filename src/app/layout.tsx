import "@/styles/globals.css";

import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import { Oswald, Roboto, Playfair_Display, Bai_Jamjuree, Forum, Josefin_Sans, Poppins, Joan } from "next/font/google";
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

const joan = Joan({
  subsets: ["latin"],
  variable: "--font-joan",
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
          joan.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html >
  );
}
