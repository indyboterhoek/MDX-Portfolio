import React from "react";
import { allBlogs } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";

export const revalidate = 60;
export default async function BlogPage() {

	return (
		<div className="relative">
			<Navigation />
			<div className="px-6 pt-10 mx-auto space-y-8 max-w-[90vw] md:pt-24 lg:pt-10 bg-blue">
				<div className="mx-auto space-y-8 max-w-[90vw] md:space-y-16 p-10 rounded-lg shadow-md h-[90vh] overflow-hidden">
					<div className="max-w-2xl mx-auto lg:mx-0">
						<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
							Blog
						</h2>
						<p className="mt-4 text-zinc-400">
							Ramblings of a mad man.
						</p>
					</div>
					<div className="w-full h-px bg-zinc-800" />

					<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
						<div className="grid grid-cols-1 gap-4">
							{allBlogs
								.filter(blog => blog.published)
								.filter((_, i) => i % 3 === 0)
								.map((blog) => (
									<Card key={blog.slug}>
										<Article blog={blog} />
									</Card>
								))}
						</div>
						<div className="grid grid-cols-1 gap-4">
							{allBlogs
								.filter(blog => blog.published)
								.filter((_, i) => i % 3 === 1)
								.map((blog) => (
									<Card key={blog.slug}>
										<Article blog={blog} />
									</Card>
								))}
						</div>
						<div className="grid grid-cols-1 gap-4">
							{allBlogs
								.filter(blog => blog.published)
								.filter((_, i) => i % 3 === 2)
								.map((blog) => (
									<Card key={blog.slug}>
										<Article blog={blog} />
									</Card>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
