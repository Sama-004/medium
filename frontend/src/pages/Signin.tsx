import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Signin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/blogs");
    }
  }, [navigate]);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signin" />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
