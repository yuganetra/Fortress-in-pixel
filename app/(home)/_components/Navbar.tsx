import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaCode } from "react-icons/fa6";
import { ActionTooltip } from "./ActionTooltip";
import { BiBuildingHouse } from "react-icons/bi";
import { RiBeerLine } from "react-icons/ri";
import { SiBlogger } from "react-icons/si";
const Navbar = ({
  className,
  isFooter,
}: {
  className?: string;
  isFooter: boolean;
}) => {
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
    <nav
      className={cn(
        "py-8 flex items-center justify-between animate-move-down",
        className
      )}
    >
     <Link href="/"><h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-2">
      Fortress in Pixels
      </h1>
      </Link>
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
