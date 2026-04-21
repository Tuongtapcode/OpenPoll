import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/store/provider';
import AppShell from '@/components/layout/app-shell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'OpenPoll - Nền tảng bình chọn thời gian thực',
  description:
    'Tạo bình chọn tương tác, chia sẻ cho mọi người, và theo dõi kết quả cập nhật thời gian thực. Xây dựng với Next.js, Express, và SSE.',
  keywords: ['bình chọn', 'voting', 'thời gian thực', 'SSE', 'Next.js'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-gray-950 text-white`}>
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}
