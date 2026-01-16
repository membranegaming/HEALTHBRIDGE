import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HealthBridge - Hospital Management System",
  description: "Comprehensive digital health companion for patients, doctors, and hospital staff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
