import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/global/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default async function MemberLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  // // Protecting from non-logged in public user
  // if (error || !data.user) {
  //   redirect("/auth");
  //   return null;
  // }

  // // Protecting from logged in other types of users
  // const roles = data.user.user_metadata;
  // console.log("USER METADATA IN MEMBER LAYOUT", roles);

  // if (roles.is_qr_member !== 1) {
  //   redirect("/auth");
  //   return null;
  // }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="hidden md:block h-auto flex-shrink-0 border-4 w-[25rem]">
          <Sidebar />
        </div>
        <div className="flex-1 p-5 md:max-w-[1140px]">{children}</div>
      </div>
    </div>
  );
}
