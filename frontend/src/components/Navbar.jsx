import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { motion } from "framer-motion";

import { FaBars } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import toast from "react-hot-toast";


const Navbar = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const [showLinks, setShowLinks] = useState(false);
  const handleShowLink = () => {
    setShowLinks((prev) => !prev);
  };

  // const authUser = false
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });


  const {
    mutate: Logout,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/auth/logout");
      return response;
    },
    onError:(error)=>{
      console.log(error)
      toast.error("Error")
    }, 
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['authUser']})
      navigate("/")
      window.location.reload()
      toast.success("Logged out")
      
    }
  });if(isError) console.log(error)
  const data = [
    { name: "Home", url: "" },
    { name: "Tasks", url: "tasks" },
    { name: "Contact", url: "contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between w-full h-16 text-white bg-teal-500 felx-row md:relative ">
      <div className="flex items-center justify-between w-full px-4">
        <h2 className="text-3xl font-bold font-poppins">FNAXIOM</h2>
        <span className="z-50 block cursor-pointer md:hidden">
          <FaBars onClick={handleShowLink} />
        </span>
      </div>

      <motion.ul
        className={`flex  px-4 gap-3 text-2xl flex-col md:flex-row items-center absolute p-0 md:bg-transparent bg-teal-500/30 md:relative ${
          showLinks ? "top-[60px] w-full" : "-top-[200px] w-full"
        } md:top-0 md:w-auto transition-all duration-200`}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {authUser ? (
          data.map((item, idx) => (
            <motion.li
              className="transition-all duration-200 cursor-pointer hover:underline"
              variants={item}
              key={idx}
            >
              <Link to={`/${item.url}`}>{item.name}</Link>
            </motion.li>
          ))
        ) : (
          <Fragment>
          <motion.li
              className="transition-all duration-200 cursor-pointer hover:underline"
              variants={item}
            >
              <Link to={`/contact`}>Contact</Link>
            </motion.li>
            <motion.li
              className="transition-all duration-200 cursor-pointer hover:underline"
              variants={item}
            >
              <Link to={`/register`}>Register</Link>
            </motion.li>
            <motion.li
              className="transition-all duration-200 cursor-pointer hover:underline"
              variants={item}
            >
              <Link to={`/login`}>Login</Link>
            </motion.li>
          </Fragment>
        )}
      </motion.ul>
      {authUser && (
        <button className="px-2 text-xl text-red-500" onClick={Logout}>
          {isPending ? "..." : <TbLogout2 />}
        </button>
      )}
    </nav>
  );
};

export default Navbar;
