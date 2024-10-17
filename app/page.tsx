import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Resume", href: "/resume" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "LinkedIn", href: "https://linkedin.indyboterhoek.com" },
  { name: "GitHub", href: "https://github.indyboterhoek.com" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-400 hover:text-zinc-300 hover:animate-pulse"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <Particles
        className="absolute inset-0 -z-10"
        quantity={200}
      />
      <h1 className="z-10 text-4xl text-transparent cursor-default text-edge-outline /builds/vegetable-ninja/font-display sm:text-6xl md:text-9xl">
        INDY BOTERHOEK
      </h1>

      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-300 ">
          I'm a software engineer passionate about game development
        </h2>
      </div>
    </div>
  );

}
