import type { Metadata } from "next";

// fonts
import { nunito } from './fonts/fonts';

import "./globals.css";
import Sidebar from "@/components/common/sidebar";


export const metadata: Metadata = {
  title: "Task Board - Organize & Track Your Tasks Efficiently",
  description: "Task Board is a powerful web app that lets you add, organize, and track your tasks in a simple and intuitive way. Stay on top of your productivity with real-time updates and customizable task management.",
  openGraph: {
    title: "Task Board - Organize & Track Your Tasks",
    description: "Task Board is a feature-rich web app that helps you manage tasks efficiently. Add tasks, track progress, and stay organized with ease.",
    images: [
      {
        url: "./assets/images/logo.png", 
        width: 1200,
        height: 630,
        alt: "Task Board App Preview", 
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Task Board - Organize & Track Your Tasks",
    description: "Add tasks, organize them, and track progress with Task Board. Manage your workload effortlessly with real-time updates.",
    images: ["./assets/images/logo.png"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}