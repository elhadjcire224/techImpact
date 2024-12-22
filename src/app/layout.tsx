import { ThemeProvider } from "@/components/theme_provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import { auth } from "./auth";
import { redirect } from "next/navigation";


const roboto = Roboto({ subsets: ["latin"], style: "normal", weight: ["100", "300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "techImpact",
  description: "techImpact",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (

    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased flex items-center justify-center flex-col min-h-screen bg-primary-foreground`}
      >
        <SessionProvider refetchInterval={2}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>

      </body>
    </html>

  );
}
