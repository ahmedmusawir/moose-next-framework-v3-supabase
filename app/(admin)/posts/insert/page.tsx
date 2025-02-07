import React from "react";
import BackButton from "@/components/common/BackButton";
import InsertForm from "./InsertForm";

const PostInsertPage = () => {
  return (
    <>
      <BackButton text="Back To Posts" link="/posts" />

      <InsertForm />
    </>
  );
};

export default PostInsertPage;
