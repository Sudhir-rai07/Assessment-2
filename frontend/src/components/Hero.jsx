import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <Fragment>
       <div className="flex justify-center w-full ">
        <div className="w-[400px] flex-col px-3 md:pt-40 pt-10 py-3 flex justify-center  backdrop-blur-lg rounded-md">
          <p className="text-4xl ">
            Welcome to{" "}
            <span className="font-bold tracking-widest text-orange-500 font-poppins">
              FNAXIOM
            </span>{" "}
            Full Stack Internship Program
          </p>
          <button
            type="button"
            className="mt-8 focus:outline-none text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-red-900 w-full"
          >
            <Link to={"/register"}>Get Started</Link>
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full mt-20 ">
        <p className="w-[500px] backdrop-blur-lg px-4 py-4 rounded-lg md:text-2xl text-xl">Join with us with <span className="font-bold text-teal-500 font-poppins">Full Stack Internship Program</span> and Learn technologies with real world projects and boost your skills</p>
      </div>

    </Fragment>
  )
}

export default Hero
