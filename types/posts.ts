// types/posts.ts
export interface Results {
  data: Post[];
  message: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  author_email: string;
  created_at: string; // Updated to String type for Supabase (created_at)
  comments?: PostComment[]; // Optional for now
}

export interface PostComment {
  id: string;
  text: string;
  username: string;
}
