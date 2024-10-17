"use client";
import { ArrowLeft, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
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
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50  duration-200 border-b  ${isIntersecting
						? "bg-zinc-900/0 border-transparent"
					: "bg-zinc-900/500  border-transparent"
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
						href="/"
						className={`duration-200 hover:font-medium ${isIntersecting
							? " text-zinc-400 hover:text-zinc-100"
							: "text-zinc-600 hover:text-zinc-900"
							} `}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
		</header>
	);
};
