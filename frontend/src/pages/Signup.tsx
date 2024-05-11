import { Quote } from "../components/Quote";
import axios from "axios";
import { Auth } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BACKEND_URL } from "../../config";

export const Signup = () => {
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
          <Auth type="signup" />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export const Delete = () => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/auth/delete`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      if (response.data.error) {
        console.error("Error deleting user: ", response.data.error);
      } else {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (err) {
      console.log();
    }
  };
  return (
    <div>
      <button onClick={handleDelete} className="bg-red-600">
        Delete Account
      </button>
    </div>
  );
};
