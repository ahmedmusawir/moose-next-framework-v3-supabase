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
import PostDeleteModal from "./PostDeleteModal";
import { usePostStore } from "@/store/usePostStore";
import { formatDate } from "@/utils/common/commonUtils";

interface PostsTableProps {
  limit?: number;
  title?: string;
  posts?: Post[];
}

const PostsTable = ({ limit, title, posts }: PostsTableProps) => {
  const {
    isModalOpen,
    selectedPostId,
    openModal,
    closeModal,
    removePost,
    totalPosts,
    getTotalPosts,
  } = usePostStore();

  useEffect(() => {
    getTotalPosts();
  }, [posts, getTotalPosts]);

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">
        {title ? title : "Posts"} ({totalPosts})
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
          {posts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Link href={`/posts/${post.id}`}>
                  {post.title} POST ID: {post.id}
                </Link>
              </TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{formatDate(post.created_at)}</TableCell>
              <TableCell className="text-right">
                <Link href={`/posts/edit/${post.id}`}>
                  <Button className="bg-gray-400 hover:bg-gray-700 text-white dark:bg-gray-500">
                    Edit Post
                  </Button>
                </Link>
                <Button
                  className="bg-red-400 text-white ml-2"
                  onClick={() => openModal(post.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedPostId && (
        <PostDeleteModal
          isOpen={isModalOpen}
          postId={selectedPostId}
          onClose={closeModal}
          onConfirm={async () => {
            await removePost(selectedPostId);
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default PostsTable;
