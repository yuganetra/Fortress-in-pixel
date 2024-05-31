'use client';
import Link from 'next/link';
import HeroSection from './_components/HeroSection';
import Navbar from './_components/Navbar';
import Monuments from './_components/Monuments';
import Blog from './_components/Blog';

export default function Home() {
  return (
    <div className="min-h-screen bg-black space-y-20 overflow-hidden">
      <div className="dark:bg-black bg-white  dark:bg-grid-white/[0.05] bg-grid-black/[0.2] relative">
        <div className="max-w-7xl mx-auto p-5 ">
          <Navbar isFooter={false} />
          <HeroSection />
        </div>
      <div className="max-w-7xl mx-auto p-5">
        <Monuments />
        <Blog />
        <div className="border-t mt-10">
          <Navbar isFooter={true} className="flex-col gap-4" />
        </div>
      </div>
      </div>
    </div>
  );
}
