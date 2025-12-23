"use client";
import { Padding } from "@mui/icons-material";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300",],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body sx={{Margin:0, Padding:0}}>
        
        {children}
      </body>
    </html>
  );
}
