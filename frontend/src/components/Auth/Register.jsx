import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from '../Utils/Loading'

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters long");
      return;
    }
    Register();
  };

  const {
    mutate: Register,
    isError,
    error,
    isPending
  } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      return response;
    },
    onError: (error) => {
      console.log(error);
      toast.error("err");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("User registered");
      setUsername('')
      setEmail("")
      setPassword("")
    },
  });

  if (isError) console.log(error);
  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <form
        className="w-[400px] justify-center items-center flex flex-col"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-8 text-3xl text-teal-300 text-bold">Register here</h2>
        <div className="flex flex-col w-full gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-2 text-xl bg-transparent border-2 border-teal-800 rounded-md outline-none backdrop-blur-lg focus:border-white"
          />
          <input
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {isPending ? <Loading /> : "Register"}
          </button>
          <span>
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:underline">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
