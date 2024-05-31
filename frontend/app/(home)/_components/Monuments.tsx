import { useEffect, useState } from 'react';
import Title from './Title';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import Link from 'next/link';
import { fetchMonuments } from '@/services/api';

 interface Monument {
  id: number;
  name: string;
  imgUrl: string;
  desc: string;
  location: string;
  builtYear: string;
  style: string;
  features: string[];
}

const Monuments = () => {
  const [monuments, setMonuments] = useState<Monument[]>([]);

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
