// types/posts.ts
export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  author_email: string;
  date: Date; // Updated to Date type for Supabase (created_at)
  comments?: PostComment[]; // Optional for now
}

export interface PostComment {
  id: string;
  text: string;
  username: string;
}
