import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any | null;
  roles: {
    is_qr_superadmin: number;
    is_qr_admin: number;
    is_qr_member: number;
  };
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: any) => void;
  setRoles: (roles: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      roles: {
        is_qr_superadmin: 0,
        is_qr_admin: 0,
        is_qr_member: 0,
      },
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setRoles: (roles) => set({ roles }),
      login: async (email, password) => {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
            Pragma: "no-cache",
            Expires: "0",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error);
        }

        const result = await response.json();
        const user = result.data.user;

        set({
          user,
          roles: user?.user_metadata || {
            is_qr_superadmin: 0,
            is_qr_admin: 0,
            is_qr_member: 0,
          },
          isAuthenticated: true,
        });
      },
      logout: async () => {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error);
        }

        set({
          user: null,
          roles: {
            is_qr_superadmin: 0,
            is_qr_admin: 0,
            is_qr_member: 0,
          },
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-store", // name of the item in the storage (localStorage or sessionStorage)
    }
  )
);
