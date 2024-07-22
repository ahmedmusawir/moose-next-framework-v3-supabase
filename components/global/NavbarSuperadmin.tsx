"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggler from "./ThemeToggler";
import Logout from "../auth/Logout";
import { User as SupabaseUser } from "@supabase/auth-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

const NavbarSuperadmin = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = createClient();
  const pathname = usePathname();

  interface NavLinkProps {
    href: string;
    children: ReactNode;
  }

  // PREPARING THE NAVLINK WITH ACTIVE LINK
  const NavLink = ({ href, children }: NavLinkProps) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={`text-gray-100 dark:text-white px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white ${
          isActive
            ? "border-b-4 border-indigo-500 text-gray-900"
            : "border-b-4 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        }`}
      >
        {children}
      </Link>
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    fetchUser(); // Fetch user on initial load

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // console.log("User:", user);

  return (
    <div className="bg-slate-700 dark:bg-slate-700 py-2 px-5 flex justify-between">
      <Link href={"/superadmin-portal"}>
        <Image
          src={
            "https://res.cloudinary.com/dyb0qa58h/image/upload/v1696245158/company-4-logo_syxli0.png"
          }
          alt="Cyberize"
          width={40}
          height={40}
        />
      </Link>
      <Link href={"/superadmin-portal"}>
        <h5 className="mt-2 ml-1">Super Admin Portal</h5>
      </Link>

      {/* NAVIGATION */}
      <nav className="hidden sm:ml-6 sm:flex flex-grow justify-center items-center">
        <NavLink href="/add-user">Add User</NavLink>
        {/* <NavLink href="/loading-example">Suspension Test</NavLink> */}
        {/* <NavLink href="/xxx">Global 404</NavLink> */}
      </nav>

      {/* DARK MODE BUTTON */}
      <div className="flex items-center">
        <ThemeToggler />

        {user && <span className="mr-3 text-white">{user.email}</span>}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src="https://res.cloudinary.com/dyb0qa58h/image/upload/v1699413824/wjykytitrfuv2ubnyzqd.png"
                alt={user ? user.email ?? "Avatar" : "Avatar"}
              />
              <AvatarFallback>
                {user ? user.email?.[0] ?? "U" : "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Logout /> {/* Use the Logout component */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavbarSuperadmin;
