import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomProvider from "./Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Login Page",
  description: "A simple login page using Next.js and Tailwind CSS",
  keywords: [
    "web development",
    "quiz",
    "study web development",
    "questions",
    "questions related to web development",
    "web development mcq",
    "full stack developer quiz",
    "web development assessment",
    "interactive web development quiz",
    "developer aptitude test",
    "next.js quiz",
    "coding quiz for beginners",
  ],
  icons: {
    icon: [{ url: "/headerLogo.png", type: "image/png", sizes: "300x200" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
