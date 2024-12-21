import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme_provider";
import { SessionProvider } from "next-auth/react";


const roboto = Roboto({ subsets: ["latin"], style: "normal", weight: ["100", "300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "techImpact",
  description: "techImpact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased flex items-center justify-center flex-col min-h-screen bg-primary-foreground`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            {children}

          </ThemeProvider>
        </SessionProvider>

      </body>
    </html>

  );
}
