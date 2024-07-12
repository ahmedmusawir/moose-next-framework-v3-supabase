// types/posts.ts
export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  author_email: string;
  date: string; // Updated to String type for Supabase (created_at)
  comments?: PostComment[]; // Optional for now
}

export interface PostComment {
  id: string;
  text: string;
  username: string;
}
