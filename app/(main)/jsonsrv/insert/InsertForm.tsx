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
import { createPost } from "@/services/jsonsrvPostServices";
import { useJsonsrvPostStore } from "@/store/useJsonsrvPostStore";
import { Post } from "@/types/posts";

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

const InsertForm = () => {
  const { toast } = useToast();
  const addPost = useJsonsrvPostStore((state) => state.addPost);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      author: "",
      date: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await addPost(data as Post);
      console.log("Post created:", data);
      toast({
        title: "Post created successfully",
        description: `Updated by ${data.author} on ${data.date}`,
      });
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast({
        title: "Error creating post",
        description: error?.message,
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl mb-4">Post Create Form</h1>
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
                <FormDescription>This is title of the Post</FormDescription>
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
                  This is the content of the Post
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
                  This is the author of the Post
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
                <FormDescription>This is the date of the Post</FormDescription>
                <FormMessage className="dark:text-red-300" />
              </FormItem>
            )}
          />
          <Button className="w-full dark:bg-slate-800 dark:text-white">
            Create Post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default InsertForm;
