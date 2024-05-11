import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Nav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  const token = localStorage.getItem("token");
  return (
    <div className="border-b border-black flex justify-between px-10 py-4">
      <Link to={"/"} className="flex flex-col justify-center cursor-pointer">
        Medium
      </Link>
      <div>
        {token ? (
          <>
            <Link to={"/create"}>
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-10 ">
                New
              </button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar name="Samanyu" size={"big"} />
                <DropdownMenuContent>
                  <DropdownMenuLabel>My profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleLogout}>
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
              </DropdownMenuTrigger>
            </DropdownMenu>
          </>
        ) : (
          <Link to={"/signin"}>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-10 ">
              Sign in
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
