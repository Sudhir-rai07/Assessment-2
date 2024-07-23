import React, { useState } from "react";
import Navbar from "./Navbar";
import { useMutation } from "@tanstack/react-query";
import Footer from "./Footer";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Utils/Loading";

const ContactaPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const {
    mutate: sendMessage,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/contact/send-message", {
        name,
        email,
        message,
      });
      return response;
    },
    onError:(error)=>{
        toast.error("Error")
        console.log(error)
    },
    onSuccess:()=>{
        toast.success("Message sent.")
        setName("")
        setEmail("")
        setMessage("")
        
    }
  });

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!name || !message || !email) {
      toast.error("All fields are required")
      return
    }

    sendMessage()
  }
  return (
    <div className="w-full h-full bg-black">
      <Navbar />

      <form className="w-[450px] mx-auto pt-28" onSubmit={handleSubmit}>
        <h2 className="mb-8 text-3xl text-center text-teal-300">
          Contact Form
        </h2>

        <div className="flex flex-col w-full gap-4">
          <input
            type="text"
            placeholder="your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-2 text-xl bg-transparent border-2 border-teal-800 rounded-md outline-none backdrop-blur-lg focus:border-white"
          />

          <input
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-2 text-xl bg-transparent border-2 border-teal-800 rounded-md outline-none backdrop-blur-lg focus:border-white"
          />

          <textarea
            placeholder="your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-2 text-xl bg-transparent border-2 border-teal-800 rounded-md outline-none backdrop-blur-lg focus:border-white"
          />

          <button
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

      <Footer />
    </div>
  );
};

export default ContactaPage;
