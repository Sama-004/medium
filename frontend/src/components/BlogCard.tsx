import { Link } from "react-router-dom";
import { format } from "date-fns";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} size={"small"} />
          <div className="flex justify-center flex-col font-light pl-2 text-sm text-black">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-light text-slate-900 flex flex-col justify-center">
            {format(new Date(publishDate), "do MMMM, h:mm a")}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-600 text-sm pt-4">{`${Math.ceil(
          content.length / 100
        )} minute read`}</div>
      </div>
    </Link>
  );
};

export function Circle() {
  return (
    <div className="h-1 w-1 rounded-full bg-slate-500">
      <div></div>
    </div>
  );
}

export function Avatar({ name, size }: { name: string; size: string }) {
  return (
    <div className="relative inline items-center justify-center">
      <div
        className={`relative inline-flex items-center justify-center ${
          size === "small" ? "w-6 h-6" : "w-10 h-10"
        }  overflow-hidden bg-gray-600 rounded-full`}>
        <span
          className={`${
            size === "small" ? "text-xs" : "text-md"
          } font-medium text-white`}>
          {name[0]}
        </span>
      </div>
    </div>
  );
}
