import Link  from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <div className="min-h-[60vh] flex flex-col-reverse gap-16 lg:flex-row items-center justify-between">
      <div className="space-y-10 text-center lg:text-left"> 
        <h1 className="text-4xl lg:text-7xl font-bold">
         Welcome to Fortress in Pixel
        </h1>
        <p className="md:w-96 text-lg text-gray-300">
          {
            "Welcome to ExploreIndia.com, your ultimate guide to the rich and diverse cultural heritage of India! Discover the magnificent monuments that showcase the architectural marvels and historical significance of this vibrant country."
          }
        </p>
        <Link href={"https://mail.google.com/mail/?view=cm&to=yuvrajsinghlodhi@gmail.com"} className="inline-block group -rotate-[3deg]" target="_blank">
            <div>
                <h1 className="text-3xl font-bold group-hover:text-customBrownlight transition-all ">Contact Us 📬</h1>
                <div className="w-40 h-2 rounded bg-customBrownlight"></div>
                <div className="w-40 h-2 rounded bg-customBrown translate-x-2"></div>
            </div>
        </Link>
      </div>
    </div>
  );
}
