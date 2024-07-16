import SinglePostContent from "./SinglePostContent";
import { Post } from "@/types/posts";
import { notFound } from "next/navigation";
import { getPosts, getSingle } from "@/services/postServices";

interface SinglePostPageProps {
  params: {
    id: number;
  };
}

// This is for SSG during build time
// export const generateStaticParams = async () => {
//   const results = await getPosts();
//   const posts: Post[] | null = results.data.data;
//   // console.log("Single Post Page", results.data.data);

//   return posts?.map((post: { id: number }) => ({
//     params: { id: post.id.toString() },
//   }));
// };

const SinglePostPage = async ({ params }: SinglePostPageProps) => {
  const result = await getSingle(params.id);
  const post: Post | null = result.data;
  // console.log("Single Post Page", post?.title);

  if (!post) {
    notFound();
  }

  return <SinglePostContent post={post} />;
};

export default SinglePostPage;
