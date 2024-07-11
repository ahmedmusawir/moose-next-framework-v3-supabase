import BackButton from "@/components/common/BackButton";
import EditForm from "./EditForm";
import { getSingle } from "@/services/jsonsrvPostServices";

interface PostEditPageProps {
  params: {
    id: string;
  };
}

const PostEditPage = async ({ params }: PostEditPageProps) => {
  const post = await getSingle(params.id);
  console.log("SINGLE POST", post);

  return (
    <>
      <BackButton text="Back To Posts" link="/jsonsrv" />
      <EditForm post={post} />
    </>
  );
};

export default PostEditPage;
