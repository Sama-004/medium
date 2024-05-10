import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
}: //publishDate,
BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} size={"small"} />
          <div className="flex justify-center flex-col font-extralight pl-2 text-sm">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          {/* <div className="pl-2 font-thin text-slate-700 flex flex-col justify-center">
            {publishDate}
          </div> */}
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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="relative inline items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-6 inline">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
            </DropdownMenuItem>
          </DropdownMenuContent>
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
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
