import React from "react";
import Navbar from "../(home)/_components/Navbar";
import Monuments from "./Monuments";
import Link from "next/link";
export default function page() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className=" dark:bg-black bg-white  dark:bg-grid-white/[0.05] bg-grid-black/[0.2]">
        <div className="max-w-7xl mx-auto p-5">
          <Navbar isFooter={false} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-5">
        <Link href="/Monuments"><Monuments /></Link>
        <div className="border-t mt-10">
          <Navbar isFooter={true} className="flex-col gap-4" />
        </div>
      </div>
    </div>
  );
}
