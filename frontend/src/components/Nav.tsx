import { Avatar } from "./BlogCard";

export const Nav = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div>Medium</div>
      <div>
        <Avatar name="Samanyu" size={6} />
      </div>
    </div>
  );
};
