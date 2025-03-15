import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient } from '@tanstack/react-query'
import { WagmiProvider } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DonateChain - Transparent Blockchain Donations',
  description: 'Track every donation with 100% transparency powered by blockchain technology',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <WagmiProvider>
                {children}
            </WagmiProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}