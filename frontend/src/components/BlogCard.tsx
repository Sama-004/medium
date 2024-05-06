interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
}: BlogCardProps) => {
  return (
    <div className="p-4 border-b border-slate-200 pb-4">
      <div className="flex">
        <Avatar name={authorName} size={6} />
        <div className="flex justify-center flex-col font-extralight pl-2 text-sm">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
          <Circle />
        </div>
        <div className="pl-2 font-thin text-slate-700 flex flex-col justify-center">
          {publishDate}
        </div>
      </div>
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-slate-600 text-sm font-thin pt-4">{`${Math.ceil(
        content.length / 100
      )}minute read`}</div>
      {/* <div className="bg-slate-200 h-1 w-full "></div> */}
    </div>
  );
};

function Circle() {
  return (
    <div className="h-1 w-1 rounded-full bg-slate-500">
      <div></div>
    </div>
  );
}

export function Avatar({ name, size }: { name: string; size: number }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-600 rounded-full`}>
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
