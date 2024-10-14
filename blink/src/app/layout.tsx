"use client";

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo, useEffect } from 'react';
import localFont from "next/font/local";
import "./globals.css";
import { AnimatePresence } from 'framer-motion';
import { AppStateProvider } from '../context/AppStateContext';
import { ThemeProvider } from '../context/ThemeContext';

import '@solana/wallet-adapter-react-ui/styles.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  useEffect(() => {
    // Apply initial theme based on user's preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMediaQuery.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>NexusNFT - Post-Claim Experience Platform</title>
        <meta name="description" content="Connect your NFTs to exclusive content and experiences with NexusNFT" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <AppStateProvider>
                  <AnimatePresence mode="wait">
                    {children}
                  </AnimatePresence>
                </AppStateProvider>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
