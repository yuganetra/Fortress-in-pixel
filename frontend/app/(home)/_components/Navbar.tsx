'use client';

import { SiBlogger } from "react-icons/si";
import { BiBuildingHouse } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchmonumentBySearch } from '@/services/api';
import SearchBox from "./SearchBox";


const Navbar = ({ className, isFooter }: { className?: string; isFooter: boolean }) => {
  const [query, setquery] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      console.log(query);

      const getMonuments = async () => {
        try {
          const data = await fetchmonumentBySearch(query);
          console.log(data)  
        } catch (error) {
          console.error("Failed to fetch monuments:", error);
        }
      };
      getMonuments();
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
    {
      Link: "/Login",
      Label: "Login",
      Icon: CiLogin ,
    },
  ];


  return (
    <nav className={cn("py-8 flex items-center justify-between animate-move-down", className)}>
      <Link href="/">
        <h1 className="text-2xl font-bold underline underline-offset-8 decoration-customBrownlight -rotate-2">
          Fortress in Pixels
        </h1>
      </Link>
      {!isFooter && (
        <SearchBox/>
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
