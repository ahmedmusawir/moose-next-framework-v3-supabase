"use client";

import posts from "@/data/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  id: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  body: z.string().min(1, {
    message: "Body is required",
  }),
  author: z.string().min(1, {
    message: "Author is required",
  }),
  date: z.string().min(1, {
    message: "Date is required",
  }),
});

const EditForm = ({ id }: Props) => {
  const { toast } = useToast();
  const post = posts.find((post) => post.id === id);
  //   console.log("The Post:", post);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
      author: post?.author || "",
      date: post?.date || "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("form Submitted by the Moose...", data);
    toast({
      title: "Post has been updated successfully",
      description: `Updated by ${post?.author} on ${post?.date}`,
    });
  };

  return (
    <>
      <h1 className="text-2xl mb-4">Edit Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text.white">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-6 bg-slate-100 dark:bg-slate-500 dark:text-white"
                    placeholder="Enter Title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is title of the Post {post?.id}
                </FormDescription>
                <FormMessage className="dark:text-red-300" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text.white">
                  Body
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    className="p-6 bg-slate-100 dark:bg-slate-500 dark:text-white"
                    placeholder="Enter Title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the content of the Post {post?.id}
                </FormDescription>
                <FormMessage className="dark:text-red-300" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text.white">
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-6 bg-slate-100 dark:bg-slate-500 dark:text-white"
                    placeholder="Enter Author"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the author of the Post {post?.id}
                </FormDescription>
                <FormMessage className="dark:text-red-300" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text.white">
                  Date
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-6 bg-slate-100 dark:bg-slate-500 dark:text-white"
                    placeholder="Enter Date"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the date of the Post {post?.id}
                </FormDescription>
                <FormMessage className="dark:text-red-300" />
              </FormItem>
            )}
          />
          <Button className="w-full dark:bg-slate-800 dark:text-white">
            Update Post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditForm;
