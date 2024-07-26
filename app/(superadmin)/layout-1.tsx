import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/global/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import NavbarSuperadmin from "@/components/global/NavbarSuperadmin";

export default async function SuperadminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSuperadmin />
      <div className="flex flex-1">
        <div className="hidden md:block h-auto flex-shrink-0 border-4 w-[25rem]">
          <Sidebar />
        </div>
        <div className="flex-1 p-5 md:max-w-[1140px]">{children}</div>
      </div>
    </div>
  );
}
