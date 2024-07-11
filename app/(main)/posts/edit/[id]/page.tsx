import React from "react";
import BackButton from "@/components/common/BackButton";
import EditForm from "./EditForm";

interface PostEditPageProps {
  params: {
    id: string;
  };
}

const PostEditPage = ({ params }: PostEditPageProps) => {
  return (
    <>
      <BackButton text="Back To Posts" link="/posts" />
      <EditForm id={params.id} />
    </>
  );
};

export default PostEditPage;
