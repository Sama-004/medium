import { BlogCard } from "../components/BlogCard";
import { Blogskeleton } from "../components/BlogSkeleton";
import { Nav } from "../components/Nav";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <Nav />
        <div className="flex justify-center">
          <div>
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Nav />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishDate={blog.publishDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
