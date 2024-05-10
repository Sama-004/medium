import { Nav } from "../components/Nav";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-yellow-custom h-screen flex flex-col justify-between">
      <div className="bg-yellow-custom">
        <Nav />
      </div>
      <div className="px-40 flex flex-col justify-center ml-4 h-screen">
        <h1 className="font-serif text-9xl">Stay Curious.</h1>
        <h2 className="mt-4 font-sans text-2xl font-bold">
          Discover stories, thinking, and expertise from writers on any topic.
        </h2>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-56 py-2 px-4 me-2 mb-2 text-xl text-center text-white font-medium focus:outline-none bg-black rounded-full mt-6">
          Start reading
        </button>
      </div>
      <div className="bg-white border border-black py-6">
        <div className="flex justify-center">
          <div className="flex cursor-pointer">
            <div className="mx-4">Help</div>
            <div className="mx-4">Status</div>
            <div className="mx-4">About</div>
            <div className="mx-4">Careers</div>
            <div className="mx-4">Blog</div>
            <div className="mx-4">Privacy</div>
            <div className="mx-4">Terms</div>
            <div className="mx-4">Text to speech</div>
            <div className="mx-4">Teams</div>
          </div>
        </div>
      </div>
    </div>
  );
};
