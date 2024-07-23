import React from 'react'
import Navbar from './Navbar'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import TaskCard from './Tasks/TaskCard'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const Feed = () => {


    const getAllTasks = async () =>{
        const response = await axios.get("/api/task/all")
        return response.data
    }
    const {data: tasks, isError, error, isPending} = useQuery({queryKey: ["allTasks"], 
        queryFn: getAllTasks
    })
console.log(tasks)
  return (
    <div className='w-full h-screen overflow-y-scroll bg-black '>
        <Navbar />

    <div className='flex w-full text-2xl'>Total Tasks : {tasks?.length}</div>
        <div className='flex flex-row w-[75%] mx-auto flex-wrap justify-center gap-4 mt-20 overflow-y-scroll'>
            {tasks && tasks.map((task)=>(
                <TaskCard username={task?.user} id={task?._id} key={task._id} taskname={task?.taskName} url={task?.url} date={task?.createdAt}/>
            ))}
        </div>
        <button className='flex px-8 py-2 ml-auto bg-orange-500 rounded-md'><Link to={'/tasks'}>Add Tasks</Link></button>


    </div>
  )
}

export default Feed

{/* {tasks && tasks.map((task)=>(
                <TaskCard username={task?.user} id={task?._id} key={task._id} taskname={task?.taskName} url={task?.url} date={task?.createdAt}/>
            ))} */}