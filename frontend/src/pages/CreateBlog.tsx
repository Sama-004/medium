import axios from "axios";
import { Nav } from "../components/Nav";
import { BACKEND_URL } from "../../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    setLoading(true);

    if (title.trim() === "" || content.trim() === "") {
      setErrorMessage("Title and content cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
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
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Error publishing post:", error);
      setErrorMessage("Error publishing post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full pt-10">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Your Title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <TextEditor onChange={(e) => setContent(e.target.value)} />
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <button
              onClick={handlePublish}
              type="submit"
              className="mt-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
              Publish post
            </button>
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
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
        Publishing...
      </div>
    </div>
  );
};
