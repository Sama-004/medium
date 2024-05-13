import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export interface Blog {
  content: string;
  title: string;
  id: number;
  publishDate: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.blog) {
          setBlog(response.data.blog);
        } else {
          setError("Blog not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching the blog");
        setLoading(false);
      });
  }, [id]);
  return {
    loading,
    blog,
    error,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    blogs,
  };
};
