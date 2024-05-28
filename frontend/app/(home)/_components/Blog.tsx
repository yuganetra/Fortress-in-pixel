'use client';

import { useEffect, useState } from 'react';
import Title from './Title';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover';
import { fetchmonumentdata, fetchTouristPlaces } from '@/services/api';
import { Monumentdata } from '@/types/monumentdata';
import { touristPlaces } from '@/types/touristPlaces';

const Blog = () => {
  const [monuments, setMonuments] = useState<Monumentdata[]>([]);
  const [touristPlaces, setTouristPlaces] = useState<touristPlaces[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [monumentData, touristPlaceData] = await Promise.all([
          fetchmonumentdata(),
          fetchTouristPlaces(),
        ]);
        setMonuments(monumentData);
        setTouristPlaces(touristPlaceData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const allBlogs = [...monuments, ...touristPlaces];

  return (
    <div className="py-10 p-5 sm:p-0">
      <Link href="/Blog">
        <Title text="Blog 📝" className="flex flex-col items-center justify-center" />
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 pt-20 gap-4">
        {allBlogs.map((blog) => (
          <Link href={`/blogs/${blog.slug}`} key={blog.id}>
            <div className={cn('p-5 rounded-md', blog.image)}>
              <DirectionAwareHover imageUrl={blog.image} className="w-full" location={blog.location}>
                <div className="space-y-4 bg-blend-darken">
                  <h1 className="font-bold text-2xl">{blog.title}</h1>
                  <p className="text-white-500">{blog.date}</p>
                  <p className="text-white-700">{blog.description}</p>
                </div>
              </DirectionAwareHover>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
