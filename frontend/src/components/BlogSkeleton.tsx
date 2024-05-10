import { Nav } from "./Nav";
export const Blogskeleton = () => {
  return (
    <div>
      <div role="status" className="animate-pulse">
        <div>
          <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              <div className="flex justify-center flex-col pl-2">
                <div
                  className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-300 rounded-full animate-pulse`}></div>
              </div>
              <div className="pl-2 font-thin text-slate-700 flex flex-col justify-center">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              </div>
            </div>
            <div className="text-xl font-semibold pt-2">
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-600 text-sm pt-4">
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export const SingleBlogSkeleton = () => {
  return (
    <div>
      <Nav />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold h-16 bg-gray-200 rounded-full mb-6 animate-pulse"></div>
            <div className="text-slate-500 pt-2 h-4 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
            <div className="pt-4">
              <div className="h-4 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-500">
              <div className="h-4 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
            </div>
            <div className="flex items-center pt-2">
              <div className="pr-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <div className="text-xl font-bold h-6 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
                <div className="text-slate-500 h-4 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
