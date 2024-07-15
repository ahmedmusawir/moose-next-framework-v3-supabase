// const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;
const BASE_URL = `https://jsonplaceholder.typicode.com/posts`;

// Fetches all the posts from the json server
export const getPosts = async () => {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();
  const totalPosts = data.length;
  return { data, totalPosts };
};

// Fetches a single post by id (THIS IS FOR ADMIN PORTAL WHERE NO NEED FOR CACHING)
export const getSingle = async (id: number) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 30,
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

// Fetches a single post by id (THIS IS FOR ADMIN PORTAL WHERE NO NEED FOR CACHING)
// export const getSingle = async (id: string) => {
//   try {
//     const res = await fetch(`${BASE_URL}/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch post with id: ${id}`);
//     }

//     return res.json();
//   } catch (error) {
//     console.error(error);
//     return null; // Return null or a specific error flag
//   }
// };

// Creates new post into the Json Server
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
  const res = await fetch(`${BASE_URL}/${id}`, {
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
export const deletePost = async (postId: number) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete post with id: ${postId}`);
  }

  console.log("Post Deleted");
  return res.json();
};
