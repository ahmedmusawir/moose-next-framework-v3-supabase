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
  selectedPostId: number | null;
  setPosts: (posts: Post[]) => void;
  fetchPosts: () => Promise<void>;
  addPost: (post: Post) => Promise<void>;
  editPost: (updatedPost: Post) => Promise<void>;
  removePost: (id: number) => Promise<void>;
  getTotalPosts: () => void;
  openModal: (id: number) => void;
  closeModal: () => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  totalPosts: 0,
  isModalOpen: false,
  selectedPostId: null,
  setPosts: (posts) => set({ posts }),

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

  editPost: async (updatedPost: Post) => {
    const editedPost = await editPost(updatedPost.id, updatedPost);
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === editedPost.id ? editedPost : post
      ),
    }));
    get().getTotalPosts(); // Call getTotalPosts after editing a post
  },

  removePost: async (id: number) => {
    await deletePost(id);
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    }));
    get().getTotalPosts(); // Call getTotalPosts after removing a post
  },

  openModal: (id: number) => {
    set({ isModalOpen: true, selectedPostId: id });
  },

  closeModal: () => {
    set({ isModalOpen: false, selectedPostId: null });
  },
}));
