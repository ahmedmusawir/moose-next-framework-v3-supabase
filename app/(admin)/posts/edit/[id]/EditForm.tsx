"use client";

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
import { usePostStore } from "@/store/usePostStore";
import { useEffect } from "react";

interface Props {
  postId: number;
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
  // date: z.string().min(1, {
  //   message: "Date is required",
  // }),
});

const EditForm = ({ postId }: Props) => {
  const fetchSinglePost = usePostStore((state) => state.fetchSinglePost);
  const post = usePostStore((state) => state.post);
  const { toast } = useToast();
  const editPost = usePostStore((state) => state.editPost);
  const notFound = post === null;

  console.log("Single Post Edit Form:", post);

  useEffect(() => {
    fetchSinglePost(postId);
  }, [fetchSinglePost, postId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
      author: post?.author || "",
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        body: post.body,
        author: post.author,
      });
    }
  }, [post, form]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await editPost({
        ...post,
        ...data,
        id: post!.id, // Ensure that id is definitely present
        author_email: post!.author_email || "", // Ensure that author_email is a string
        created_at: post!.created_at || "", // Ensure that created_at is a string
      });
      toast({
        title: "Post has been updated successfully",
        description: `Updated by ${data.author}`,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Error",
        description: "Failed to update post",
      });
    }
  };

  return (
    <>
      {notFound && (
        <div className="bg-red-500 text-yellow-300 p-4 mb-4">
          The Post Not Found
        </div>
      )}
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
          {/* <FormField
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
          /> */}
          <Button className="w-full dark:bg-slate-800 dark:text-white">
            Update Post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditForm;
