import { create } from "zustand";
import {
  getPosts,
  createPost,
  editPost,
  deletePost,
} from "@/services/postServices";
import { Post } from "@/types/posts";

interface PostState {
  posts: Post[];
  totalPosts: number;
  isModalOpen: boolean;
  selectedPostId: string | null;
  actionTrigger: boolean;
  fetchPosts: () => Promise<void>;
  addPost: (post: Post) => Promise<void>;
  editPost: (updatedPost: Post) => Promise<void>;
  removePost: (id: number) => Promise<void>;
  getTotalPosts: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  setPosts: (posts: Post[]) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  totalPosts: 0,
  isModalOpen: false,
  selectedPostId: null,
  actionTrigger: false,

  getTotalPosts: () => {
    set((state) => ({
      totalPosts: state.posts.length,
    }));
  },

  fetchPosts: async () => {
    const { data, totalPosts } = await getPosts();
    set({ posts: data, totalPosts });
  },

  addPost: async (post: Post) => {
    const { data: newPost } = await createPost(post);
    set((state) => ({
      posts: [...state.posts, newPost],
      actionTrigger: !state.actionTrigger,
    }));
    get().getTotalPosts();
  },

  editPost: async (updatedPost: Post) => {
    const { data: editedPost } = await editPost(updatedPost.id, updatedPost);
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === editedPost.id ? editedPost : post
      ),
      actionTrigger: !state.actionTrigger,
    }));
    get().getTotalPosts();
  },

  removePost: async (id: number) => {
    await deletePost(id);
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
      actionTrigger: !state.actionTrigger,
    }));
    get().getTotalPosts();
  },

  openModal: (id: string) => {
    set({ isModalOpen: true, selectedPostId: id });
  },

  closeModal: () => {
    set({ isModalOpen: false, selectedPostId: null });
  },

  setPosts: (posts: Post[]) => {
    set({ posts });
  },
}));
