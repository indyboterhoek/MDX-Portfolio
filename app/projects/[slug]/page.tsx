import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
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

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allProjects
		.filter((project) => project.published || project._raw.flattenedPath.includes("[draft]"))
		.map((project) => ({
			slug: project.slug,
		}));
}

export default async function PostPage({ params, searchParams }: Props) {
	const slug = params?.slug;
	const project = allProjects.find((project) => project.slug === slug);
	const isDraft = searchParams.draft === "true";

	if (!project || (!project.published && !isDraft)) {
		notFound();
	}

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header project={project} />

			<article className="px-4 py-12 mx-auto max-w-[75vw] prose prose-zinc prose-quoteless">
				<Mdx code={project.body.code} />
			</article>
		</div>
	);
}
