import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { Nav } from "./Nav";

export const SingleBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Nav />
      <div className="border bg-slate-500 w-full"></div>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 12 baje</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-500">Author</div>
            <div className="flex items-center pt-2">
              <div className="pr-4">
                <Avatar size="big" name={blog.author.name} />
              </div>
              <div className="flex flex-col">
                <div className="text-xl font-bold">{blog.author.name}</div>
                <div className="text-slate-500">
                  Random catch or description of author
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
