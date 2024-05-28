'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Monument } from '@/types/types'; // Adjust the import path according to your project structure

// Your component code here...

const API_URL = "https://localhost:7048/api/";

const SearchResultsPage = () => {
  const [results, setResults] = useState<Monument[]>([]);
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParam = urlParams.get('query');
    console.log(urlParams)

    setQuery(queryParam);
  }, []);

  useEffect(() => {
    // Fetch results only when query is available
    const fetchResults = async () => {
      console.log(query)
      if (!query) return;

      try {
        const response = await axios.get(`${API_URL}MyEntities/search?query=${encodeURIComponent(query)}`);
        setResults(response.data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  if (!query) {
    // Render loading state while query is being fetched
    console.log(query)

    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Search Results for &quot;{query}&quot;</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            {/* Render content of each search result */}
            {/* {result.title} - {result.description} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
