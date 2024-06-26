'use client';
/* eslint-disable @next/next/no-img-element */
import { fetchMonumentBySearch } from "@/services/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState,Suspense } from "react";
import Navbar from "../(home)/_components/Navbar";

interface Item {
  id: number;
  name: string;
  imgUrl: string;
  description: string;
  location: string;
  builtYear: string;
  style: string;
  features: string[];
}
const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState<Item[]>([]);

  useEffect(() => {
    const getMonuments = async () => {
      try {
        const data = await fetchMonumentBySearch(query);
        setSearchResults(data);
      } catch (error) {
        console.error("Failed to fetch monuments:", error);
      }
    };

    if (query) {
      getMonuments();
    }
  }, [query]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-black  overflow-hidden">
        <div className="dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.2] relative">
          <div className="max-w-7xl mx-auto p-5">
            <Navbar isFooter={false} />
          </div>
        
        <div className="max-w-7xl mx-auto p-5">
          {searchResults.length > 0 ? (
            searchResults.map((monument) => (
              <div key={monument.id} className="max-w-5xl mx-auto px-8 py-16">
                <h1 className="text-4xl font-bold mb-4">{monument.name}</h1>
                <img
                  src={monument.imgUrl}
                  alt={monument.name}
                  className="w-full h-auto mb-4"
                />
                <p className="text-lg mb-2">{monument.description}</p>
                <ul>
                  {monument.location && (
                    <li>
                      <strong>Location:</strong> {monument.location}
                    </li>
                  )}
                  {monument.builtYear && (
                    <li>
                      <strong>Built Year:</strong> {monument.builtYear}
                    </li>
                  )}
                  {monument.style && (
                    <li>
                      <strong>Style:</strong> {monument.style}
                    </li>
                  )}
                  {monument.features && monument.features.length > 0 && (
                    <li>
                      <strong>Features:</strong>
                      <ul>
                        {monument.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SearchPage;
