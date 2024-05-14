import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Nav } from "@/components/Nav";
import { Blogskeleton } from "@/components/BlogSkeleton";
import { Link } from "react-router-dom";
export const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/blog/delete/${id}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      if (response.status === 200) {
        console.log("Post deleted successfully");
        // Remove deleted post from state
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        console.log("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
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
          <div className="flex justify-center mb-4">
            <Link to={"/create"}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
                New post
              </button>
            </Link>
          </div>
          {loading ? (
            <div>
              <Blogskeleton />
              <Blogskeleton />
              <Blogskeleton />
            </div>
          ) : posts.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-4xl mt-40 font-bold font-sans">
                You have not made any post
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <BlogCard
                type="profile"
                id={post.id}
                authorName={post.author.name}
                title={post.title}
                content={post.content}
                publishDate={post.publishDate}
                // handleDelete={handleDelete}
                onDelete={() => handleDelete(post.id)}
                showDelete={true}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
