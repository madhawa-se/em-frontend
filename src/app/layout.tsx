import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import StoreProvider from "../store/StoreProvider";

const roboto = Roboto({
  weight: ['300','400', '500', '700'],
  variable: '--font-content',
  preload: false,
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={roboto.className}>{children}
          <footer>
            <ToastContainer />
          </footer>
        </body>

      </html>
    </StoreProvider>
  );
}
