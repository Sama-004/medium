import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { useRecoilState } from "recoil";
import { usernameState } from "@/recoil";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setUsername] = useRecoilState(usernameState);

  async function sendRequest() {
    try {
      setLoading(true);
      if (!email || !password) {
        setError("Email and password are required");
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError("Invalid email format");
        return;
      }
      const requestData = {
        email,
        password,
        ...(type === "signup" && { name }),
      };
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/${type === "signin" ? "signin" : "signup"}`,
        requestData
      );
      const jwt = response.data.jwt;
      if (jwt) {
        localStorage.setItem("token", jwt);
        localStorage.setItem("username", response.data.username);
        setUsername(response.data.username);
        navigate("/blogs");
      } else {
        setError("User already exists");
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-bold ">
              {type === "signin" ? "Login" : "Create an account"}
            </div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Don't have an account"
                : "Already have an account?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="underline pl-2">
                {type === "signin" ? "Register" : "Login"}
              </Link>
            </div>
          </div>
          {type === "signin" ? null : (
            <div className="pt-8">
              <LabelledInput
                label="username"
                type="name"
                placeholder="John Doe"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          )}
          <div className="pt-3">
            <LabelledInput
              label="Email"
              type="Email"
              placeholder="test@xyz.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <LabelledInput
              label="Password"
              type="Password"
              placeholder="******"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendRequest();
                }
              }}
            />
            {error && <div className="text-red-600">{error}</div>}
            {loading ? (
              <div className="animate-pulse bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 mt-6"></div>
            ) : (
              <button
                onClick={sendRequest}
                type="button"
                className="text-white mt-6 w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                {type === "signup" ? "Sign up" : "Sign in"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type: string;
}
function LabelledInput({
  label,
  type,
  placeholder,
  onChange,
  onKeyDown,
}: LabelledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">
          {label}
        </label>
        <input
          type={type || "text"}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
