"use client";
import type { Blog } from "@/.contentlayer/generated";
import { ArrowLeft, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	blog: Blog;
};
export const Header: React.FC<Props> = ({ blog }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate bg-gradient-to-tl from-black via-zinc-900 to-black"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${isIntersecting
					? "bg-zinc-900/0 border-transparent"
					: "bg-white/10  border-zinc-200 lg:border-transparent"
					}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">

					<div className="flex justify-between gap-8">
						<Link
							href="/resume"
							className={`duration-200 hover:font-medium ${isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
								} `}
						>
							Resume
						</Link>
						<Link
							href="/projects"
							className={`duration-200 hover:font-medium ${isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
								} `}
						>
							Projects
						</Link>
						<Link
							href="/blog"
							className={`duration-200 hover:font-medium ${isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
								} `}
						>
							Blog
						</Link>
						<Link
							href="/contact"
							className={`duration-200 hover:font-medium ${isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
								} `}
						>
							Contact
						</Link>
						<Link target="_blank" href="https://linkedin.indyboterhoek.com">
							<Linkedin
								className={`w-6 h-6 duration-200 hover:font-medium ${isIntersecting
									? " text-zinc-400 hover:text-zinc-100"
									: "text-zinc-600 hover:text-zinc-900"
									} `}
							/>
						</Link>
						<Link target="_blank" href="https://github.indyboterhoek.com">
							<Github
								className={`w-6 h-6 duration-200 hover:font-medium ${isIntersecting
									? " text-zinc-400 hover:text-zinc-100"
									: "text-zinc-600 hover:text-zinc-900"
									} `}
							/>
						</Link>
					</div>

					<Link
						href="/blog"
						className={`duration-200 hover:font-medium ${isIntersecting
							? " text-zinc-400 hover:text-zinc-100"
							: "text-zinc-600 hover:text-zinc-900"
							} `}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
			<div className="container mx-auto relative isolate overflow-hidden  py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
							{blog.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-zinc-300">
							{blog.description}
						</p>
					</div>
				</div>
			</div>
		</header>
	);
};
