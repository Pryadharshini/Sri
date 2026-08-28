import type { Metadata } from "next";
import { Montserrat, Philosopher } from "next/font/google";
import Preloader from "@/components/Preloader";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const philosopher = Philosopher({
  variable: "--font-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Sanjana - Bharatanatyam Dresses",
  description: "Premium Bharatanatyam dresses and fabrics for dancers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${philosopher.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden flex flex-col font-sans bg-background text-foreground selection:bg-accent selection:text-background">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
