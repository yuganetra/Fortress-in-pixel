"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi"; 
import router from "next/router";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/Search-results?q=${query}`);
    setQuery("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const toggleSearchBox = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="relative">
      {!showSearch && (
        <div className="md:hidden">
          <FiSearch
            className="text-white text-2xl cursor-pointer"
            onClick={toggleSearchBox}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`${
          showSearch ? "block" : "hidden"
        } md:flex md:items-center relative`}
      >
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-customBrownlight w-48 md:w-auto" // Adjust width
          value={query}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-customBrownlight text-white px-4 py-2 rounded-md hidden md:block"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
