const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`;

// Fetches all the posts from Supabase
export const getPosts = async () => {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();
  const totalPosts = data.data.length;
  const posts = data?.data;
  return { posts, totalPosts };
};

// Fetches a single post by id
export const getSingle = async (id: number) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
      next: {
        revalidate: 0,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post with id: ${id}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null; // Return null or a specific error flag
  }
};

// Creates new post in Supabase
export const createPost = async (data: any) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
};

// Edits post by id
export const editPost = async (id: number, data: any) => {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, ...data }),
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return res.json();
};

// Deletes post by id
export const deletePost = async (postId: number) => {
  const res = await fetch(BASE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: postId }),
  });

  if (!res.ok) {
    throw new Error(`Failed to delete post with id: ${postId}`);
  }

  return res.json();
};
