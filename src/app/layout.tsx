import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import { Suspense } from 'react'


const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${poppinsFont.className} antialiased overflow-y-scroll`}>
      <Providers>
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Toaster />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
