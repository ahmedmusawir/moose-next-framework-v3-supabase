const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`;

// Fetches all the posts from the Supabase
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
  // console.log("ONLY TOTAL DATA FROM SUPA", data.data.length);
  const totalPosts = data.data.length;
  return { data, totalPosts };
};

// Fetches a single post by id
export const getSingle = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
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

// Creates new post in the Supabase
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
export const editPost = async (id: string, data: any) => {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return res.json();
};

// Deletes post by id
export const deletePost = async (postId: string) => {
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
