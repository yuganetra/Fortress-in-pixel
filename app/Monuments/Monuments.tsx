'use client';

import { monuments } from '@/app/history_data';
import Title from '../(home)/_components/Title';
import { HoverEffectMonument } from './MonumentDetails';
import Link from 'next/link';

const Monuments = () => {

  return (
    <div className="max-w-5xl mx-auto px-8">
      <Link href="/skills">
        <Title
          text="Monuments 🏛️ & Tourist places"
          className="flex flex-col items-center justify-center"
        />
      </Link>
      <HoverEffectMonument items={monuments} />
    </div>
  );
};

export default Monuments;
