import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Nav } from "@/components/Nav";
import { Blogskeleton } from "@/components/BlogSkeleton";
export const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/auth/profile`, {
          headers: {
            Authorization: `${localStorage.getItem(`token`)}`,
          },
        });
        if (response.data.error) {
          console.error("Error fetching posts:", response.data.error);
        } else {
          setPosts(response.data.posts);
        }
      } catch (e) {
        console.error("Error fetching posts: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <Nav />
      <div className="flex justify-center">
        <div>
          <h1 className="text-6xl flex justify-center font-serif mt-10 underline mb-4">
            Your Posts
          </h1>
          {loading ? (
            <div>
              <Blogskeleton />
              <Blogskeleton />
              <Blogskeleton />
            </div>
          ) : (
            posts.map((post) => (
              <BlogCard
                id={post.id}
                authorName={post.author.name}
                title={post.title}
                content={post.content}
                publishDate={post.publishDate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
