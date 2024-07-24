"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null); // Reset error state before submission

    // Login API call
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Login Submitted by the Moose...", response);

    if (response.ok) {
      const result = await response.json();
      // console.log("Result Object after Login:", result);

      const user = result.data.user;
      console.log("User Object after Login:", user);
      const roles = user.user_metadata; // Fetching the roles from user metadata

      console.log("Superadmin:", roles.is_qr_superadmin);
      console.log("Admin:", roles.is_qr_admin);
      console.log("Member:", roles.is_qr_member);
      // Role-based redirection logic
      if (roles.is_qr_superadmin === 1) {
        router.push("/superadmin-portal");
      } else if (roles.is_qr_admin === 1) {
        router.push("/dashboard");
      } else if (roles.is_qr_member === 1) {
        router.push("/members-portal");
      } else {
        router.push("/"); // Fallback in case no roles match
      }
    } else {
      const result = await response.json();
      console.error("Login error:", result.error);
      setError(result.error); // Set the error state
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Log into your account with your credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text.white">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="p-6 bg-slate-100 dark:bg-slate-500 dark:text-white"
                        placeholder="Please Enter Email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="dark:text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text.white">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="p-6 bg-slate-100 dark:bg-slate-500 dark:text-white"
                        placeholder="Please Enter password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="dark:text-red-300" />
                  </FormItem>
                )}
              />
              {error && (
                <div className="text-red-500 dark:text-red-300 text-sm mt-2">
                  {error}
                </div>
              )}
              <Button className="w-full bg-slate-700 text-white dark:bg-slate-600 dark:text-white hover:bg-gray-900">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
