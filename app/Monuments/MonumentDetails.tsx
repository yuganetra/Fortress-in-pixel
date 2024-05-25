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
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-2 py-10', className)}>
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === item.id && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-lg"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="rounded-md w-full overflow-hidden bg-black group-hover:ring-2 ring-green-500 relative z-20 transition-all duration-500 cursor-pointer">
              <div className="py-10 z-50 relative space-y-5">
                <img src={item.imgUrl} alt={item.name} className="mx-auto h-72 w-96" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-300">{item.name}</p>
                  {hoveredIndex === item.id && ( // Show details only when hovered
                    <>
                      <p className="text-gray-500">{item.desc}</p>
                      <p className="text-gray-500">Location: {item.location}</p>
                      <p className="text-gray-500">Built Year: {item.builtYear}</p>
                      <p className="text-gray-500">Style: {item.style}</p>
                      <p className="text-gray-500">Features: {item.features.join(', ')}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
