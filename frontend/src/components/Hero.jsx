import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <Fragment>
       <div className="w-full flex justify-center pt-52">
        <div className="w-[400px] flex-col px-3 py-3 flex justify-center  backdrop-blur-lg rounded-md">
          <p className=" text-4xl">
            Welcome to{" "}
            <span className="tracking-widest text-orange-500 font-bold font-poppins">
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

      <div className="flex w-full justify-center mt-20 ">
        <p className="w-[500px] backdrop-blur-lg px-4 py-4 rounded-lg text-2xl">Join with us with <span className="text-teal-500 font-poppins font-bold">Full Stack Internship Program</span> and Learn technologies with real world projects and boots your skills</p>
      </div>

    </Fragment>
  )
}

export default Hero
