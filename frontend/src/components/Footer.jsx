import React from 'react'

const Footer = () => {
    const data = ["@FNAXIOM All rights reserved", "Facebook", "Instagram", "LinkedIn"]
  return (
    <footer className='px-8 items-center flex absolute bottom-0 w-full h-20 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 bg-teal-400'>
      <div>
        <ul className='flex gap-4 justify-center w-full'>
        {data.map((item , idx)=>(
            <li className='cursor-pointer' key={idx}>{item}</li>
        ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
