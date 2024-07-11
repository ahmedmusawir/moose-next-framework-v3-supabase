import { getSingle } from "@/services/jsonsrvPostServices";
import SinglePostContent from "./SinglePostContent";
import { Post } from "@/types/posts";
import { notFound } from "next/navigation";
import { getPosts } from "@/services/jsonsrvPostServices";

interface SinglePostPageProps {
  params: {
    id: string;
  };
}

// This is for SSG during build time
export const generateStaticParams = async () => {
  const { data: posts } = await getPosts();
  return posts.map((post: { id: string }) => ({
    params: { id: post.id.toString() },
  }));
};

const SinglePostPage = async ({ params }: SinglePostPageProps) => {
  const post: Post | null = await getSingle(params.id);

  if (!post) {
    notFound();
  }

  return <SinglePostContent post={post} />;
};

export default SinglePostPage;
