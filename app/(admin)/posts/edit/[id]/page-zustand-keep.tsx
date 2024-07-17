import BackButton from "@/components/common/BackButton";
import EditForm from "./EditForm";

interface PostEditPageProps {
  params: {
    id: number;
  };
}

const PostEditPage = async ({ params }: PostEditPageProps) => {
  const postId = params.id;

  return (
    <>
      <BackButton text="Back To Posts" link="/posts" />
      <EditForm postId={postId} />
    </>
  );
};

export default PostEditPage;
