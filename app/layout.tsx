import { Open_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const openSans = Open_Sans({
  weight: ['500', '800'],
  subsets: ['cyrillic'],
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <main className="min-h-screen">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
