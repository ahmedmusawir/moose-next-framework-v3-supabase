"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import PostPagination from "@/components/jsonsrv/PostPagination";
import PostsTable from "@/components/jsonsrv/PostsTable";
import { Button } from "@/components/ui/button";
import { useJsonsrvPostStore } from "@/store/useJsonsrvPostStore";
import { Post } from "@/types/posts";
import { Folder, Folders, MessageCircle, Newspaper, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const fetchPosts = useJsonsrvPostStore((state) => state.fetchPosts);
  const posts = useJsonsrvPostStore((state) => state.posts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <main className="">
      <div className="flex flex-col md:flex-row sm:flex-wrap justify-center gap-5 mb-5">
        <Link href={"/posts"}>
          <DashboardCard
            title="Posts"
            count={100}
            icon={<Newspaper className="text-slate-500" size={72} />}
          />
        </Link>
        <DashboardCard
          title="Categories"
          count={12}
          icon={<Folders className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Users"
          count={750}
          icon={<User className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Comments"
          count={120}
          icon={<MessageCircle className="text-slate-500" size={72} />}
        />
      </div>
      <PostsTable title="Featured Posts" limit={7} posts={posts} />
    </main>
  );
}
