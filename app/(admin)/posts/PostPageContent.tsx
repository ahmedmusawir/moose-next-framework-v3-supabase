"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/common/BackButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePostStore } from "@/store/usePostStore";
import PostsTable from "@/components/posts/PostsTable";
import PostPagination from "@/components/posts/PostPagination";

const PostPageContent = () => {
  const fetchPosts = usePostStore((state) => state.fetchPosts);
  const posts = usePostStore((state) => state.posts);
  const totalPosts = usePostStore((state) => state.totalPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(totalPosts / limit);

  // console.log("Post Page Posts:", posts);
  // console.log("Total Posts:", totalPosts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Ensure posts is always an array
  const paginatedPosts = Array.isArray(posts)
    ? posts.slice((currentPage - 1) * limit, currentPage * limit)
    : [];

  return (
    <>
      <BackButton text="Go Back" link="/" />
      <Link className="float-end" href="/posts/insert">
        <Button className="bg-green-700 hover:bg-green-600">
          Create New Post
        </Button>
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
