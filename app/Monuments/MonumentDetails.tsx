import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export const HoverEffectMonument = ({
  items,
  className,
}: {
  items: {
    id: number;
    name: string;
    imgUrl: string;
    desc: string;
    location: string;
    builtYear: string;
    style: string;
    features: string[];
  }[];
  className?: string;
}) => {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-1 py-10 gap-8', className)}>
      {items.map((item) => (
         <Link href={`/single_monument/${item.id}`} key={item.id}>
        <div key={item.id} className="flex items-center gap-8 p-2 h-full w-full">
          <div className="rounded-md w-full overflow-hidden bg-black group-hover:ring-2 ring-green-500 relative z-20 transition-all duration-500 cursor-pointer">
            <img src={item.imgUrl} alt={item.name} className="h-72 w-full object-cover" />
          </div>
          <div className="text-gray-300">
            <p className="text-2xl font-bold">{item.name}</p>
            <p className="text-gray-500">{item.desc}</p>
            <p className="text-gray-500">Location: {item.location}</p>
            <p className="text-gray-500">Built Year: {item.builtYear}</p>
            <p className="text-gray-500">Style: {item.style}</p>
            <p className="text-gray-500">Features: {item.features.join(', ')}</p>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};