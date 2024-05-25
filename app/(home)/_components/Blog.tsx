import Title from './Title';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover';
import { monumentsData, touristPlacesData } from '@/app/history_data';

const Blog = () => {
  const allBlogs = [...monumentsData, ...touristPlacesData];
  // const slicedAllBlogs = allBlogs.slice(0, 4); 

  return (
    <div className="py-10 p-5 sm:p-0">
      <Link href="/Blog">
        <Title text="Blog 📝" className="flex flex-col items-center justify-center" />
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 pt-20 gap-4">
        {allBlogs.map((blog, index) => {
          return (
            <Link href={`/blogs/${blog.slug}`} key={index}>
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
          );
        })}
      </div>
    </div>
  );
};

export default Blog;