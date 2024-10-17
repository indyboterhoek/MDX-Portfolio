import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
	searchParams: {
		draft?: string;
	};
};

export default async function PostPage({ params, searchParams }: Props) {
	const slug = params?.slug;
	const blog = allBlogs.find((blog) => blog.slug === slug);
	const isDraft = searchParams.draft === "true";

	if (!blog || (!blog.published && !isDraft)) {
		notFound();
	}

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header blog={blog} />

			<article className="px-4 py-12 mx-auto max-w-[75vw] prose prose-zinc prose-quoteless">
				<Mdx code={blog.body.code} />
			</article>
		</div>
	);
}

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allBlogs
		.filter((blog) => blog.published || blog._raw.flattenedPath.includes("[draft]"))
		.map((blog) => ({
			slug: blog.slug,
		}));
}
