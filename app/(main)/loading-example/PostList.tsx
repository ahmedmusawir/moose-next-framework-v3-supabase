import Row from "@/components/common/Row";
import { Post } from "@/types/posts";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;

export const getItems = async () => {
  //Fake delay to show page loading spinner
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

const PostList = async () => {
  const posts: Post[] = await getItems();

  return (
    <Row className="max-w-3xl mx-auto">
      {posts?.map((post) => (
        <li className="dark:text-white">{post.title}</li>
      ))}
    </Row>
  );
};

export default PostList;
