"use client";

import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

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

  return <div onClick={handleLogout}>Logout</div>;
};

export default Logout;
