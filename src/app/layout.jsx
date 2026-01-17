"use client";
import { Padding } from "@mui/icons-material";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { GlobalProvider } from "@/app/context/GlobalContext";
const inter = Inter({
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header/>
            <GlobalProvider>
          {children}
        </GlobalProvider>
   <Footer/>
      </body>
    </html>
  );
}
