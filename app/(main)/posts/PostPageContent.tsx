"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/common/BackButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/posts";
import { usePostStore } from "@/store/usePostStore";
import PostsTable from "@/components/posts/PostsTable";
import PostPagination from "@/components/posts/PostPagination";

interface PostPageContentProps {
  initialPosts: Post[];
  totalPosts: number;
}

const PostPageContent = ({
  initialPosts,
  totalPosts,
}: PostPageContentProps) => {
  const setPosts = usePostStore((state) => state.setPosts);
  const posts = usePostStore((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(totalPosts / limit);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts, setPosts]);

  // Ensure posts is always an array
  const paginatedPosts = Array.isArray(posts)
    ? posts.slice((currentPage - 1) * limit, currentPage * limit)
    : [];

  return (
    <>
      <BackButton text="Go Back" link="/" />
      <Link className="float-end" href="/jsonsrv/insert">
        <Button className="bg-green-500">Create New Post</Button>
      </Link>
      <PostsTable title="Supabase Posts" limit={limit} posts={paginatedPosts} />
      <PostPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostPageContent;
