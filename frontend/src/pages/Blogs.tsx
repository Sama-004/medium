import { useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { Blogskeleton } from "../components/BlogSkeleton";
import { Nav } from "../components/Nav";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs, error } = useBlogs();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA = new Date(a.publishDate);
    const dateB = new Date(b.publishDate);
    if (sortOrder === "newest") {
      return dateB.getTime() - dateA.getTime();
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });
  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value as "newest" | "oldest");
  };

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
        <div className="flex flex-col md:flex md:flex-row justify-center">
          <div className="mt-2 text-xl">
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
          <div>
            {sortedBlogs.map((blog) => (
              <BlogCard
                id={blog.id.toString()}
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
