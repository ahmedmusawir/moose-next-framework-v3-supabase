import NavbarLoginReg from "@/components/global/NavbarLoginReg";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarLoginReg />
      <div className="h-[100vh] flex items-center justify-center relative">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
