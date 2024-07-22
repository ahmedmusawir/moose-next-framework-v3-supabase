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
} from "@/components/ui/card";
import { useState } from "react";

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
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
    passwordConfirm: z.string().min(1, {
      message: "Password confirmation is required",
    }),
    role: z.string().min(1, {
      message: "User type is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"], // Path where the error message will be displayed
  });

const AddUserForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    let user_metadata = {
      name: data.name,
      is_qr_superadmin: 0,
      is_qr_admin: 0,
      is_qr_member: 0,
    };

    if (data.role === "superadmin") {
      user_metadata.is_qr_superadmin = 1;
    } else if (data.role === "admin") {
      user_metadata.is_qr_admin = 1;
    } else if (data.role === "member") {
      user_metadata.is_qr_member = 1;
    }

    const response = await fetch("/api/auth/superadmin-add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        user_metadata: user_metadata,
      }),
    });

    console.log("Signup Response: ", response);

    if (response.ok) {
      router.push("/superadmin-portal"); // Redirect to the superadmin dashboard after user creation
    } else {
      const result = await response.json();
      console.error("Signup error:", result.error);
      setError(result.error); // Set the error state
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add User</CardTitle>
          <CardDescription>
            Register a new user with their credentials
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text.white">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="p-6 bg-slate-100 dark:bg-slate-500 dark:text-white"
                        placeholder="Please Enter Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-300" />
                  </FormItem>
                )}
              />
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
                        placeholder="Please Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text.white">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="p-6 bg-slate-100 dark:bg-slate-500 dark:text-white"
                        placeholder="Please Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text.white mr-5">
                      User Type
                    </FormLabel>
                    <FormControl>
                      <select
                        className="p-6 bg-slate-100 dark:bg-slate-500 dark:text-white"
                        {...field}
                      >
                        <option value="">Choose a user type</option>
                        <option value="superadmin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                      </select>
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
              <Button className="w-full bg-slate-700 text-white hover:bg-gray-900 dark:bg-slate-600 dark:text-white  dark:hover:bg-slate-600">
                Add User
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddUserForm;
