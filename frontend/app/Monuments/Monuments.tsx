'use client';

import Title from '../(home)/_components/Title';
import { HoverEffectMonument } from './MonumentDetails';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchMonuments } from '@/services/api';

const Monuments = () => {
  const [monuments, setMonuments] = useState([]);

  useEffect(() => {
    const getMonuments = async () => {
      try {
        const data = await fetchMonuments();
        setMonuments(data);
      } catch (error) {
        console.error("Failed to fetch monuments:", error);
      }
    };

    getMonuments();
  }, []);
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
