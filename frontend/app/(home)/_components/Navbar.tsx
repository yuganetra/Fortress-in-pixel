'use client';

import { SiBlogger } from "react-icons/si";
import { BiBuildingHouse } from "react-icons/bi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchMonuments } from '@/services/api';


const Navbar = ({ className, isFooter }: { className?: string; isFooter: boolean }) => {
  const [query, setquery] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      console.log(query);

      const getMonuments = async () => {
        try {
          const data = await fetchMonuments();
          data.map((i: { name: any; }) => {
            if(i.name === query){
              console.log(i);
            }
          })
  
        } catch (error) {
          console.error("Failed to fetch monuments:", error);
        }
      };
      getMonuments();
      // router.push(`/Search-results/${query}`);
    }
  };

  const socials = [
    {
      Link: "/Monuments",
      Label: "Monuments ",
      Icon: BiBuildingHouse,
    },
    {
      Link: "/Blog",
      Label: "Blog",
      Icon: SiBlogger,
    },
  ];

  return (
    <nav className={cn("py-8 flex items-center justify-between animate-move-down", className)}>
      <Link href="/">
        <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-2">
          Fortress in Pixels
        </h1>
      </Link>
      {!isFooter && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-green-500"
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />
          <button
            className="absolute top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      ) }
      <div className="flex items-center gap-5">
        {socials.map((social, index) => {
          const Icon = social.Icon;
          return (
            <Link href={social.Link} aria-label={social.Label} key={index}>
              <Icon className="size-5 hover:scale-125 transition-all" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
