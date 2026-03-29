import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Paulo Guilherme | Portfolio",
  description: "Full Stack Developer — Transforming ideas into efficient, responsive, and intuitive technological solutions.",
  icons: {
    icon: "/images/profile/thumbnail_Image.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="min-h-screen flex flex-col items-center">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
