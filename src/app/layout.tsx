import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "fakewack",
  description: "Making the world more boasting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="max-w-2xl mx-auto flex justify-between px-4 py-4">{children}</main>
        <Footer/>
      </body> 
    </html>
  );
}
