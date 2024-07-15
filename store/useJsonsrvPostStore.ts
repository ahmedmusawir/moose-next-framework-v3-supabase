import { create } from "zustand";
import {
  getPosts,
  createPost,
  editPost,
  deletePost,
} from "@/services/jsonsrvPostServices";
import { Post } from "@/types/posts";

interface PostState {
  posts: Post[];
  totalPosts: number;
  isModalOpen: boolean;
  selectedPostId: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: Post) => Promise<void>;
  removePost: (id: string) => Promise<void>;
  getTotalPosts: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useJsonsrvPostStore = create<PostState>((set, get) => ({
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
    const response = await getPosts();
    set({ posts: response.data, totalPosts: response.totalPosts });
  },

  addPost: async (post: Post) => {
    const newPost = await createPost(post);
    set((state) => ({
      posts: [...state.posts, newPost],
    }));
    get().getTotalPosts(); // Call getTotalPosts after adding a post
  },

  removePost: async (id: string) => {
    // await deletePost(id);
    set((state) => ({
      //   posts: state.posts.filter((post) => post.id !== id),
    }));
    get().getTotalPosts(); // Call getTotalPosts after removing a post
  },

  openModal: (id: string) => {
    set({ isModalOpen: true, selectedPostId: id });
  },

  closeModal: () => {
    set({ isModalOpen: false, selectedPostId: null });
  },
}));
