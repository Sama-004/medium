import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Delete, Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { CreateBlog } from "./pages/CreateBlog";
import { Landing } from "./pages/Landing";
import { Profile } from "./pages/Profile";
import { RecoilRoot, useRecoilState } from "recoil";
import { usernameState } from "./recoil";
import { useEffect } from "react";
import { EditBlog } from "./pages/EditBlog";

function App() {
  const [username, setUsername] = useRecoilState(usernameState);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/delete/user" element={<Delete />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function AppWithRecoilRoot() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
export default AppWithRecoilRoot;
