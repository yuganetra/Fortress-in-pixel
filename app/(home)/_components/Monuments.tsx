'use client';

import { monuments } from '@/app/history_data';
import Title from './Title';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import Link from 'next/link';

const Monuments = () => {

  return (
    <div className="max-w-5xl mx-auto px-8">
      <Link href="/Monuments">
        <Title
          text="Monuments 🏛️ & Tourist places"
          className="flex flex-col items-center justify-center"
        />
      </Link>
      <HoverEffect items={monuments} />
    </div>
  );
};

export default Monuments;
