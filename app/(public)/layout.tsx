import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/global/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import NavbarHome from "@/components/global/NavbarHome";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  // if (error || !data.user) {
  //   redirect("/auth");
  // }

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarHome />
      <div className="flex flex-1">
        {/* <div className="hidden md:block h-auto flex-shrink-0 border-4 w-[25rem]">
          <Sidebar />
        </div> */}
        <div className="flex-1 p-5 md:max-w-[1140px]">{children}</div>
      </div>
    </div>
  );
}
