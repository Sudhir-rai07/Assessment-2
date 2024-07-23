import React from 'react'

const Footer = () => {
    const data = ["@FNAXIOM All rights reserved", "Facebook", "Instagram", "LinkedIn"]
  return (
    <footer className='fixed bottom-0 flex items-center w-full px-8 bg-teal-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10'>
      <div>
        <ul className='flex flex-col justify-center w-full gap-4 md:flex-row'>
        {data.map((item , idx)=>(
            <li className='cursor-pointer' key={idx}>{item}</li>
        ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
