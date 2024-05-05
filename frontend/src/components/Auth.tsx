import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/${type === "signin" ? "signin" : "signup"}`,
        { email, password }
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (err) {
      //send error
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-bold ">Create an account</div>
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
          <div className="pt-8">
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
            />
            <button
              onClick={sendRequest}
              type="button"
              className="text-white mt-6 w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
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
  type: string;
}
function LabelledInput({
  label,
  type,
  placeholder,
  onChange,
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
