import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from '../../axios/api'
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../Utils/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email) {
      toast.error("All fields are required");
      return;
    }
    Login();
  };

  const {
    mutate: Login,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/auth/login", { email, password });
      return response;
    },
    onError:(error)=>{
      toast.error("err")
    },
    onSuccess:()=>{
      toast.success("Logged in")
      queryClient.invalidateQueries({queryKey: ["authUser"]})
      setEmail("")
      setPassword("")
    }
  });
  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <form
        className="w-[400px] justify-center items-center flex flex-col"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-8 text-3xl text-teal-300 text-bold">Login here</h2>
        <div className="flex flex-col w-full gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-2 text-xl bg-transparent border-2 border-teal-800 rounded-md outline-none backdrop-blur-lg focus:border-white"
          />
          <input
            type="password"
            placeholder="********"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-xl bg-transparent border-2 border-teal-800 rounded-md outline-none backdrop-blur-lg focus:border-white"
          />
          {isError && (
            <p className="text-red-500">{error.response.data.error}</p>
          )}
          <button
          disabled={isPending}
            type="submit"
            className="flex items-center justify-center w-full px-3 py-2 mx-auto ml-auto text-xl text-center bg-orange-500 rounded-lg disabled:cursor-not-allowed disabled:bg-gray-400 md:w-1/2"
          >
            {isPending ? <Loading /> : "Login"}
          </button>
          <span>
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-500 hover:underline">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
