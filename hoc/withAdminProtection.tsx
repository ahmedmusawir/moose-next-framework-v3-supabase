"use client";

import { ComponentType, ReactNode, useEffect } from "react";
import Spinner from "@/components/common/Spinner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

interface LayoutProps {
  children: ReactNode;
}
const withAdminProtection = (WrappedComponent: ComponentType<LayoutProps>) => {
  return (props: LayoutProps) => {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const roles = useAuthStore((state) => state.roles);

    useEffect(() => {
      if (!isAuthenticated || roles.is_qr_admin !== 1) {
        router.push("/auth");
      }
    }, [isAuthenticated, roles, router]);

    if (!isAuthenticated || roles.is_qr_admin !== 1) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminProtection;
