// In your /utils/jsonSrv/jsonUtils.ts file

import { Post } from "@/types/posts";

export const getFilteredAndSortedPosts = (
  posts: Post[] = [],
  limit?: number
) => {
  const filteredPosts = limit ? [...posts].slice(0, limit) : posts;
  const sortedPosts = filteredPosts.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  return sortedPosts;
};
