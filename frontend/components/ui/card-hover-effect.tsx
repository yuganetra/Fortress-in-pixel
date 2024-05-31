import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export const HoverEffect = ({
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
  const [displayCount, setDisplayCount] = useState<number>(4);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 4);
  };

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2  py-10', className)}>
      {items.slice(0, displayCount).map((item, idx) => {
        return (
          <Link href={`/single_monument/${item.id}`} key={item.id}>
            <div
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
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
              <div className="rounded-md w-full overflow-hidden bg-black group-hover:ring-2 ring-customBrownlight relative z-20 transition-all duration-500 cursor-pointer">
                <div className="py-10 z-50 relative space-y-5">
                <img src={item.imgUrl} alt={item.name} className="mx-auto h-72 w-96" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-300">{item.name}</p>
                    <p className="text-gray-500">{item.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
      {displayCount < items.length && (
        <div className="flex justify-center"> 
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
