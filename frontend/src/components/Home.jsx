
import React, { Fragment } from "react";
import Navbar from './Navbar'
import Hero from "./Hero";
import Footer from "./Footer";
import '../App.css';

const Home = () => {
  return (
    <div className="w-full h-full overflow-y-scroll bg">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
