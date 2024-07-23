import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Utils/Loading";
import Footer from "../Footer";

const Tasks = () => {
  const [url, setUrl] = useState("");
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url || !taskName) {
      toast.error("All fields are required");
      return;
    }
    SumbitTask();
  };

  const {
    mutate: SumbitTask,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/task/submit-task", {
        url,
        taskName,
      });
      return response;
    },
    onError: (error)=>{
      toast.error("error")
      console.log(error)
    },
    onSuccess: ()=>{
      toast.success("Task submited")
      setTaskName("")
      setUrl("")
    }
  });
  return (
    <div className="flex flex-col items-center w-full h-full bg-black">
      <Navbar />
      <form
        className="w-[350px] md:w-[400px] justify-center items-center flex flex-col pt-28"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-8 text-4xl font-bold text-bold">
          Add Task here
        </h2>
        <div className="flex flex-col w-full gap-4">
          <input
            type="text"
            placeholder="TaskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-2 text-xl bg-transparent border-2 border-teal-800 rounded-md outline-none backdrop-blur-lg focus:border-white"
          />
          <input
            type="text"
            placeholder="Task Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-2 text-xl bg-transparent border-2 border-teal-800 rounded-md outline-none backdrop-blur-lg focus:border-white"
          />

          <button
            disabled={isPending}
            type="submit"
            className="flex items-center justify-center w-full px-3 py-2 mx-auto ml-auto text-xl text-center bg-orange-500 rounded-lg disabled:cursor-not-allowed disabled:bg-gray-400 md:w-1/2"
          >
            {isPending ? <Loading /> : "Submit"}
          </button>

          {isError && (
            <p className="text-red-500">{error.response.data.error}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Tasks;
