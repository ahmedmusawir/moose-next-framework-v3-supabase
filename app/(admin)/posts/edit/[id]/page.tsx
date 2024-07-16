import BackButton from "@/components/common/BackButton";
import EditForm from "./EditForm";
import { getSingle } from "@/services/postServices";

interface PostEditPageProps {
  params: {
    id: number;
  };
}

const PostEditPage = async ({ params }: PostEditPageProps) => {
  const result = await getSingle(params.id);
  const post = result?.data ?? null;

  console.log("SINGLE POST", post);

  return (
    <>
      <BackButton text="Back To Posts" link="/posts" />
      <EditForm post={post} />
    </>
  );
};

export default PostEditPage;
