import axios from "axios";
import { Nav } from "../components/Nav";
import { BACKEND_URL } from "../../config";
import { ChangeEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: { Authorization: `${token}` },
        });
        const title = response.data.blog.title;
        const content = response.data.blog.content;
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog/edit/${id}`,
        {
          title,
          content,
          publishDate: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        navigate(`/blog/${id}`);
      } else {
        console.error(
          "Error publishing post: Server responded with status",
          response.status
        );
      }
    } catch (error) {
      console.error("Error publishing post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <Nav />
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full pt-10">
          <input
            onChange={handleTitleChange}
            value={title}
            type="text"
            placeholder="Your Title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <TextEditor onChange={handleContentChange} value={content} />
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <button
              onClick={handleEdit}
              type="submit"
              className="mt-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
              Update post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
  value,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4 outline-none">
        <div className="flex items-center justify-between border">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label htmlFor="editor" className="sr-only">
              Publish post
            </label>
            <textarea
              onChange={onChange}
              value={value}
              id="editor"
              rows={8}
              className="block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2 focus:outline-none"
              placeholder="Write an article..."
              required></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex justify-center mt-2">
      <div className="animate-pulse inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-300 rounded-lg">
        Updating...
      </div>
    </div>
  );
};
