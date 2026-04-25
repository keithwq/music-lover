import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '爱乐助手',
  description: '爱乐助手 - 让音乐学习更简单',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}