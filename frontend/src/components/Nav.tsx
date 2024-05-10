import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Nav = () => {
  return (
    <div className="border-b border-black flex justify-between px-10 py-4">
      <Link to={"/"} className="flex flex-col justify-center cursor-pointer">
        Medium
      </Link>
      <div>
        <Link to={"/create"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
            New
          </button>
        </Link>
        <Avatar name="Samanyu" size={"big"} />
      </div>
    </div>
  );
};
