import { Open_Sans } from "next/font/google";

import "./globals.css";
import { Footer, Header } from "@/components/shared";

const openSans = Open_Sans({
	weight: ["500", "800"],
	subsets: ['cyrillic'],
	style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased`}
      >
				<Header />
					<main className='min-h-screen'>
        		{children}
					</main>
				<Footer />
      </body>
    </html>
  );
}
