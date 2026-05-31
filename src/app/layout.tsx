import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Real House Company — Plot Map Viewer",
  description: "Land plot overlay viewer on satellite maps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
