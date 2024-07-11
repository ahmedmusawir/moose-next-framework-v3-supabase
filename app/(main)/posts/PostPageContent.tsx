import BackButton from "@/components/common/BackButton";
import PostPagination from "@/components/posts/PostPagination";
import PostsTable from "@/components/posts/PostsTable";
import React from "react";

const PostPageContent = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <PostsTable title="Latest Posts" limit={5} />

      <PostPagination />
    </>
  );
};

export default PostPageContent;
