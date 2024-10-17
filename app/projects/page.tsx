import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";

export const revalidate = 60;
export default async function ProjectsPage() {
	const featured = allProjects.find((project) => project.featured === 1 && project.published)!;
	const top2 = allProjects.find((project) => project.featured === 2 && project.published)!;
	const top3 = allProjects.find((project) => project.featured === 3 && project.published)!;
	const sorted = allProjects
		.filter((p) => p.published)
		.filter(
			(project) =>
				project.slug !== (featured && featured.slug) &&
				project.slug !== (top2 && top2.slug) &&
				project.slug !== (top3 && top3.slug),
		)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	return (
		<div className="relative">
			<Navigation />
			<div className="px-6 pt-10 mx-auto space-y-8 max-w-[90vw] md:pt-24 lg:pt-10 bg-blue">
				<div className="mx-auto space-y-8 max-w-[90vw] md:space-y-16 p-10 rounded-lg shadow-md h-[90vh] overflow-hidden">
					<div className="max-w-2xl mx-auto lg:mx-0">
						<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
							Projects
						</h2>
						<p className="mt-4 text-zinc-400">
							Just a few of the projects I've worked on.
						</p>
					</div>
					<div className="w-full h-px bg-zinc-800" />

					<div id="scrollbar" className="overflow-x-auto m-0 space-y-8 h-[70%] p-5">
						<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
							<Card>
								<Link href={`/projects/${featured && featured.slug || ""}`}>
									<div style={{
										backgroundImage: `${featured && featured.image ? "url(" + featured.image + ")" : ""}`, backgroundSize: `100% 100%`, width: `100%`, height: `100%`, filter: `blur(2px)`
									}} />
									<article className="relative w-full h-full p-4 md:p-8"
										style={{ transform: `translate(0, -100%)` }}>
										<div className="flex items-center justify-between gap-2">
											<div className="text-xs text-zinc-100">
												{featured && featured.date ? (
													<time dateTime={new Date(featured && featured.date).toISOString()}>
														{Intl.DateTimeFormat(undefined, {
															dateStyle: "medium",
														}).format(new Date(featured && featured.date))}
													</time>
												) : (
													<span>SOON</span>
												)}
											</div>
										</div>

										<h2
											id="featured-post"
											className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
										>
											{featured && featured.title}
										</h2>
										<p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
											{featured && featured.description}
										</p>
									</article>
								</Link>
							</Card>

							<div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
								{top2 && (
									<Card key={top2 && top2.slug}>
										<Article project={top2} />
									</Card>
								)}
								{top3 && (
									<Card key={top3 && top3.slug}>
										<Article project={top3} />
									</Card>
								)}
							</div>
						</div>
						<div className="hidden w-full h-px md:block bg-zinc-800" />

						<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
							<div className="grid grid-cols-1 gap-4">
								{sorted
									.filter((_, i) => i % 3 === 0)
									.map((project) => (
										<Card key={project && project.slug}>
											<Article project={project} />
										</Card>
									))}
							</div>
							<div className="grid grid-cols-1 gap-4">
								{sorted
									.filter((_, i) => i % 3 === 1)
									.map((project) => (
										<Card key={project && project.slug}>
											<Article project={project} />
										</Card>
									))}
							</div>
							<div className="grid grid-cols-1 gap-4">
								{sorted
									.filter((_, i) => i % 3 === 2)
									.map((project) => (
										<Card key={project && project.slug}>
											<Article project={project} />
										</Card>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
