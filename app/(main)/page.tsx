import DashboardCard from "@/components/dashboard/DashboardCard";
import PostPagination from "@/components/posts/PostPagination";
import PostsTable from "@/components/posts/PostsTable";
import { Button } from "@/components/ui/button";
import { Folder, Folders, MessageCircle, Newspaper, User } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
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
      <PostsTable title="Latest Posts" limit={5} />
      <PostPagination />
    </main>
  );
}
