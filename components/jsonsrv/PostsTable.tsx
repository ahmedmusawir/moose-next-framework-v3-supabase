"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { Post } from "@/types/posts";
import { getFilteredAndSortedPosts } from "@/utils/jsonSrv/jsonsrvUtils";
import { useJsonsrvPostStore } from "@/store/useJsonsrvPostStore";

interface PostsTableProps {
  limit?: number;
  title?: string;
  posts?: Post[];
}

const PostsTable = ({ limit, title, posts }: PostsTableProps) => {
  const { openModal, totalPosts, getTotalPosts } = useJsonsrvPostStore();

  // Sorting alphabetically with post limit
  const sortedFilteredPosts = getFilteredAndSortedPosts(posts, limit);

  useEffect(() => {
    getTotalPosts();
  }, [posts, getTotalPosts]);

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">
        {title ? title : "Posts"} (7)
      </h3>
      <Table className="mb-8">
        <TableCaption>A list of your recent JSON Server posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedFilteredPosts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Link href={`/jsonsrv/${post.id}`}>
                  {post.title} POST ID: {post.id}
                </Link>
              </TableCell>
              <TableCell>{post.author}</TableCell>
              {/* <TableCell>{post.created_at}</TableCell> */}
              {/* <TableCell className="text-right">
                <Link href={`/jsonsrv/edit/${post.id}`}>
                  <Button>Edit Post</Button>
                </Link>
                <Button
                  className="bg-red-400 text-white ml-2"
                  // onClick={() => openModal(post.id)}
                >
                  Delete
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
