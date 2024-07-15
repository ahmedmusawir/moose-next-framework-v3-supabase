"use Client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthTabs = () => {
  const [selectedTab, setSelectedTab] = useState("login");

  return (
    <Tabs
      defaultValue="login"
      className="w-[400px] mt-16"
      onValueChange={setSelectedTab}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="login"
          className={`p-2 text-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            selectedTab === "login"
              ? "border-2 border-slate-700 dark:border-gray-100"
              : "border-2 border-transparent"
          } rounded-md`}
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="register"
          className={`p-2 text-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            selectedTab === "register"
              ? "border-2 border-slate-700 dark:border-gray-100"
              : "border-2 border-transparent"
          } rounded-md`}
        >
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="login"
        className="p-4 border-t border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
      >
        <LoginForm />
      </TabsContent>
      <TabsContent
        value="register"
        className="p-4 border-t border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
      >
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
