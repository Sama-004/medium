import { SingleBlog } from "../components/SingleBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { SingleBlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return (
      <div>
        <SingleBlogSkeleton />
      </div>
    );
  }
  return (
    <div>
      <SingleBlog blog={blog} />
    </div>
  );
};
