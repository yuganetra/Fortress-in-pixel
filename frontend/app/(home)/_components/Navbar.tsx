'use client';

import { SiBlogger } from "react-icons/si";
import { BiBuildingHouse } from "react-icons/bi";
import { CiLogin, CiUser } from "react-icons/ci";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SearchBox from "./SearchBox";
import { useEffect, useState } from "react";
import { onAuthChange, logout } from "@/services/auth";
import { User } from "firebase/auth"; // Import the User type from Firebase

const Navbar = ({
  className,
  isFooter,
}: {
  className?: string;
  isFooter: boolean;
}) => {
  const [user, setUser] = useState<User | null>(null); // Use the User type from Firebase

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const socials = [
    {
      Link: "/Monuments",
      Label: "Monuments",
      Icon: BiBuildingHouse,
    },
    {
      Link: "/Blog",
      Label: "Blog",
      Icon: SiBlogger,
    },
    user
      ? {
          Link: "#",
          Label: "Logout",
          Icon: CiUser,
          onClick: async () => {
            await logout();
            setUser(null);
          },
        }
      : {
          Link: "/Login",
          Label: "Login",
          Icon: CiLogin,
        },
  ];

  return (
    <nav
      className={cn(
        "py-8 flex items-center justify-between animate-move-down",
        className
      )}
    >
      <Link href="/">
        <h1 className="text-2xl font-bold underline underline-offset-8 decoration-customBrownlight -rotate-2">
          Fortress in Pixels
        </h1>
      </Link>
      {!isFooter && <SearchBox />}
      <div className="flex items-center gap-5">
        {user && <span className="text-white">Hello, {user.displayName}</span>}
        {socials.map((social, index) => {
          const Icon = social.Icon;
          return social.Link === "#" ? (
            <button
              key={index}
              onClick={social.onClick}
              aria-label={social.Label}
              className="size-5 hover:scale-125 transition-all"
            >
              <Icon />
            </button>
          ) : (
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
