import { BlogCard } from "../components/BlogCard";
import { Blogskeleton } from "../components/BlogSkeleton";
import { Nav } from "../components/Nav";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs, error } = useBlogs();
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
      {error ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-500 text-2xl">{error}</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};
