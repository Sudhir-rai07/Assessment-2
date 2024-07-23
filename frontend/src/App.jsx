import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Tasks from "./components/Tasks/Tasks";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Feed from "./components/Feed";
import ContactaPage from "./components/ContactaPage";
import Footer from "./components/Footer";

const App = () => {
  const getMe = async () => {
    const response = await axios.get("/api/auth/me"); 
    if(response.data == undefined) {
      return null
    }
    return response;
  };
  const {
    data: user,
    isError,
    error,
    isFetching,
  } = useQuery({ queryKey: ["authUser"], queryFn: getMe });
  console.log(user)

  return (
    <div className="w-full h-screen text-white">
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to={'/feed'} />} />
        <Route path="/feed" element={user ? <Feed /> : <Navigate to={'/'} />} />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/tasks"
          element={user ? <Tasks /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/contact"
          element={<ContactaPage />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
