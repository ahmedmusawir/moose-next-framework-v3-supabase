import { create } from "zustand";
import {
  getPosts,
  createPost,
  editPost,
  deletePost,
  getSingle,
} from "@/services/postServices";
import { Post } from "@/types/posts";

interface PostState {
  post: Post | null;
  posts: Post[];
  totalPosts: number;
  isModalOpen: boolean;
  selectedPostId: number | null;
  fetchPosts: () => Promise<void>;
  fetchSinglePost: (id: number) => Promise<void>;
  addPost: (post: Post) => Promise<void>;
  editPost: (updatedPost: Post) => Promise<void>;
  removePost: (id: number) => Promise<void>;
  getTotalPosts: () => void;
  openModal: (id: number) => void;
  closeModal: () => void;
  setPosts: (posts: Post[]) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  post: null,
  posts: [],
  totalPosts: 0,
  isModalOpen: false,
  selectedPostId: null,

  getTotalPosts: () => {
    set((state) => ({
      totalPosts: state.posts.length,
    }));
  },

  fetchPosts: async () => {
    const { posts, totalPosts } = await getPosts();
    set({ posts, totalPosts });
  },

  fetchSinglePost: async (id: number) => {
    const result = await getSingle(id);
    const post = result?.data ?? null;

    set({ post });
  },

  addPost: async (post: Post) => {
    const { data: newPost } = await createPost(post);
    set((state) => ({
      posts: [...state.posts, newPost],
    }));
    get().getTotalPosts();
  },

  editPost: async (updatedPost: Post) => {
    const { data: editedPost } = await editPost(updatedPost.id, updatedPost);
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === editedPost.id ? editedPost : post
      ),
    }));
    get().getTotalPosts();
  },

  removePost: async (id: number) => {
    await deletePost(id);
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    }));
    get().getTotalPosts();
  },

  openModal: (id: number) => {
    set({ isModalOpen: true, selectedPostId: id });
  },

  closeModal: () => {
    set({ isModalOpen: false, selectedPostId: null });
  },

  setPosts: (posts: Post[]) => {
    set({ posts });
  },
}));
