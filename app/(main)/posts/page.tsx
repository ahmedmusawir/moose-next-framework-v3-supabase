import { getPosts } from "@/services/postServices";
import PostPageContent from "./PostPageContent";

const PostPage = async () => {
  const { data: posts, totalPosts } = await getPosts();

  return <PostPageContent initialPosts={posts.data} totalPosts={totalPosts} />;
};

export default PostPage;
