"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      router.push("/auth");
    } else {
      const result = await response.json();
      console.error("Logout error:", result.error);
    }
  };

  useEffect(() => {
    router.replace(pathname);
  }, [router, pathname]);

  return <div onClick={handleLogout}>Logout</div>;
};

export default Logout;
