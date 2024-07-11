"use client";

import BackButton from "@/components/common/BackButton";
import PostPagination from "@/components/jsonsrv/PostPagination";
import PostsTable from "@/components/jsonsrv/PostsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useJsonsrvPostStore } from "@/store/useJsonsrvPostStore";
import { useEffect, useState } from "react";

const PostPageContent = () => {
  const fetchPosts = useJsonsrvPostStore((state) => state.fetchPosts);
  const posts = useJsonsrvPostStore((state) => state.posts);
  const totalPosts = useJsonsrvPostStore((state) => state.totalPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(totalPosts / limit);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <>
      <BackButton text="Go Back" link="/" />
      <Link className="float-end" href="/jsonsrv/insert">
        <Button className="bg-green-500">Create New Post</Button>
      </Link>
      <PostsTable
        title="Json Server Posts"
        limit={limit}
        posts={paginatedPosts}
      />
      <PostPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostPageContent;
