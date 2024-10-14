"use client";

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const LandingPage = dynamic(() => import('../components/LandingPage'), { ssr: false });
const Dashboard = dynamic(() => import('../components/Dashboard'), { ssr: false });

export default function Home() {
  const pathname = usePathname();

  console.log("Current pathname:", pathname); // Add this line for debugging

  if (pathname === '/dashboard') {
    return <Dashboard />;
  }

  return <LandingPage />;
}
