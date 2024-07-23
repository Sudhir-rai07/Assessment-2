import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaClipboard } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdateTaskModal from "../UpdateTaskModal";
const TaskCard = ({username, taskname, url, date, id }) => {

    const [view, setView] = useState(false)
const handleView = () =>{
    setView(prev => !prev)
}
    const queryClient = useQueryClient()
  const {mutate:deleteTask} = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete("/api/task/delete-task/" + id);
      return response;
    },
    onError:(error)=>{
        toast.error("Error")
        console.log(error)
    }, onSuccess: ()=>{
        toast.success("Deleted")
        queryClient.invalidateQueries({queryKey: ["allTasks"]})
    }
  });
  return (
    <div className="w-[300px] px-2 py-2 rounded-md border-2 border-teal-500">
      <div className="flex items-center ">
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <img src="/boy1.png" />
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="ml-2 text-xl">{username.username}</p>
          <MdDelete
            className="text-xl cursor-pointer hover:text-red-500"
            onClick={()=> deleteTask(id)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <p className="text-xl">
          <span>Taskname : </span> {taskname}
        </p>
        <a href={url} target="_blank" className="text-xl">
          <span>url : </span> {url}
        </a>
        <p className="text-xl">
          <span>data submited : </span> {new Date(date).toDateString()}
        </p>
      </div>

      <FaClipboard onClick={handleView}  className="mt-2 text-2xl text-orange-500 cursor-pointer" title="update"/>
      {view && <UpdateTaskModal eTaskName={taskname} eUrl={url} eId={id} viewFn={handleView}/>}
    </div>
  );
};

export default TaskCard;
