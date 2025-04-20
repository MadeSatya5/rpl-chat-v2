import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next"; 

export const metadata: Metadata = {
  title: "Bunshin Chat",
  description: "User Friendly Chat App",
  openGraph: {
    title: "Bunshin Chat",
    description: "User Friendly Chat App",
    url: "https://bunshin-chat.vercel.app/login",
    siteName: "Bunshin Chat",
    images: [
      {
        url: "https://bunshin-chat.vercel.app/bunshin.png", 
        width: 1200,
        height: 630,
        alt: "Bunshin Chat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body>
        <Toaster />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
