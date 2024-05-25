'use client';

import { useParams } from 'next/navigation';
import { monuments } from '@/app/history_data';
import Navbar from '@/app/(home)/_components/Navbar'; 

const MonumentDetails = () => {
  const params = useParams();
  const { id } = params;
  const monument = monuments.find((monument) => monument.id === parseInt(id as string));

  if (!monument) {
    return <div>Monument not found</div>;
  }

  return (
    <>
 <div className="min-h-screen bg-black space-y-20 overflow-hidden">
      <div className="dark:bg-black bg-white  dark:bg-grid-white/[0.05] bg-grid-black/[0.2] relative">
        <div className="max-w-7xl mx-auto p-5 ">
        <Navbar isFooter={false} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-5">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-4">{monument.name}</h1>
        <img src={monument.imgUrl} alt={monument.name} className="w-full h-auto mb-4" />
        <p className="text-lg mb-2">{monument.desc}</p>
        <p><strong>Location:</strong> {monument.location}</p>
        <p><strong>Built Year:</strong> {monument.builtYear}</p>
        <p><strong>Style:</strong> {monument.style}</p>
        <ul>
          <strong>Features:</strong>
          {monument.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      </div>
    </div>


      
      
    </>
  );
};

export default MonumentDetails;
