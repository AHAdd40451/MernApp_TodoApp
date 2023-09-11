"use client";
import React, { useState, FC, FormEvent, ChangeEvent, useEffect } from "react";
import { BiChevronUp } from "react-icons/bi";
import { BiChevronDown } from "react-icons/bi";
import { BiSolidFolder } from "react-icons/bi";
import { BiCheckbox } from "react-icons/bi";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { BiSolidCheckbox } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { useTodos } from "@/store/Todo";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";
import { GiConfirmed } from "react-icons/gi";
import { TbSubtask } from "react-icons/tb";
import { Skeleton } from "@mui/material";
const Accordion: FC<any> = (props) => {
  const [data, setData] = useState(props.datas);
  const [show, setShow] = useState(false);
  const [curDate, setCurDate] = useState(false);
  const [todo, setTodo] = useState("");
  const [updateInputShow, setUpdateInputShow] = useState("");
  const [updateTodo, setUpdateTodo] = useState("");
  const [subTaskShow, setSubTaskShow] = useState("");
  const [subTaskTodo, setSubTaskTodo] = useState("");

  const isSameAsCurrentDate = (inputDate: any) => {
    const currentDate: any = new Date();
    const inputDateObj: any = new Date(inputDate);
    const isSameYear = currentDate.getFullYear() === inputDateObj.getFullYear();
    const isSameMonth = currentDate.getMonth() === inputDateObj.getMonth();
    const isSameDay = currentDate.getDate() === inputDateObj.getDate();
    return isSameYear && isSameMonth && isSameDay;
  };

  useEffect(() => {
    setData(props.datas);
  }, [props.datas]);

  const {
    handleAddTodo,
    handleTaskComplete,
    HandleCalendar,
    openModal,
    setOpenModal,
    handleDelete,
    handleUpdate,
    handleAddSubTaskTodo,
    handleSubTaskComplete,
  } = useTodos();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    HandleCalendar(true);

  };

  useEffect(() => {

    if (openModal === false) {
      handleAddTodo(data.section, todo, false);
      setTodo("");
      setOpenModal(null);
    }

  }, [openModal]);
  const handleTaskComlete = (id: any, status: boolean) => {
    handleTaskComplete(status, id);
  };
  const handleToggleActive = () => {
    setShow(!show);
  };
  const handleDeleteTodo = (id: any) => {
    handleDelete(id);
  };

  const handleEditTodo = (id: any, prevTask: string) => {
    setUpdateInputShow(id);
    setUpdateTodo(prevTask);
  };

  const handleUpdateSubmit = (id?: any) => {
    handleUpdate(updateTodo, id);
    setUpdateInputShow("");
  };

  const handleAddSubTask = (id: any) => {
    setSubTaskShow(id);
  };

  const handleAddSubsTaskSubmit = (id: any) => {
    handleAddSubTaskTodo(id, subTaskTodo, false)
    setSubTaskShow("");
    setSubTaskTodo("");
  };

  const handleSubTaskDone = (status: boolean, id: any) => {
    handleSubTaskComplete(status, id);
  };

  const calculateDueTime = (dueDate: any) => {
    const comingDate: any = new Date(dueDate);
    const currentDate: any = new Date();
    const timeDifference: any = comingDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };




  return (
    <div
      className={`w-full  pl-0  bg-[#F4F4F4]  rounded-md mb-5 duration-500 group ${show ? "is-active " : ""
        }`}
    >
      <div className="flex items-center mb-[12px]">
        <span className="mr-[10px]">
          <BiSolidFolder className="text-[#413F3F66] w-[19px] h-[19px]" />
        </span>
        <div className="w-auto text-[14px] font-inter font-bold">
          {data?.section}
        </div>
        <span className="block w-full border-t border-[#BCBCC370] mr-[5px] ml-[1rem] "></span>
        <div className="text-xl  cursor-pointer " onClick={handleToggleActive}>
          {show ? <BiChevronDown /> : <BiChevronUp />}
        </div>
        <div className="text-xl  cursor-pointer " onClick={handleToggleActive}>
          <input
            type="text"
            name=""
            id=""
            value={data?.todos?.length - 1}
            className="w-[19px] h-[19px] bg-[#413F3F] text-white rounded-[6px] text-center text-[11px] font-inter font-bold relative bottom-[3px]"
            readOnly
          />
        </div>
      </div>

      <div className="overflow-hidden duration-500 max-h-0 group-[.is-active]:max-h-fit mb-[10px] flex flex-col-reverse">
        <div className="flex items-center mt-[11px]">
          <BiSolidCheckbox
            className={
              "cursor-pointer text-[#E2E2E2] w-[30px] h-[30px] relative right-[3px] rounded-2"
            }
          />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              id=""
              value={todo}
              placeholder="Write a task..."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTodo(event.target.value)
              }
              className="bg-[#F4F4F4] border border-transparent focus:outline-none focus:transparent focus:transparent focus:border-transparent w-full  font-inter font-normal text-[14px] leading-[18.11px]"
            />
          </form>
        </div>

        {data.todos.map((todo: any) => (
          <>
            {todo.task && (
              <>
                {/* Tasks */}

                <div
                  className={`flex items-start  group relative ${todo?.subtasks?.length > 0 && "mb-[14px]"
                    } `}
                  key={todo?.id}
                >
                  {todo?.done ? (
                    <BiSolidCheckboxChecked
                      onClick={() => handleTaskComlete(todo.id, false)}
                      className={
                        `cursor-pointer text-[#B5B5BA] w-[30px] h-[45px] p-0 relative right-1 rounded-2`
                      }
                    />
                  ) : (
                    <BiCheckbox
                      onClick={() => handleTaskComlete(todo.id, true)}
                      className={
                        `cursor-pointer  w-[30px] h-[45px] relative right-1 rounded-2 ${isSameAsCurrentDate(todo?.date) == true ? "text-[#FF4545]" : "text-[#B5B5BA]"}`
                      }
                    />
                  )}

                  <div className="flex flex-col relative top-[10px]">
                    {updateInputShow === todo.id ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault(), handleUpdateSubmit(todo.id);
                        }}
                      >
                        <input
                          type="text"
                          name=""
                          id=""
                          value={updateTodo}
                          placeholder="Update a task..."
                          onChange={(e) => setUpdateTodo(e.target.value)}
                          className="bg-[#F4F4F4] border border-transparent focus:outline-none focus:transparent focus:transparent focus:border-transparent w-full  font-inter font-normal text-[14px] leading-[18.11px]"
                        />
                      </form>
                    ) : (
                      <span
                        className={`mr-[6px] font-inter font-normal text-base leading-[18.11px] mt-[5px] ${todo?.done && "line-through text-[#B5B5BA]"
                          }`}
                      >
                        {todo?.task}

                      </span>
                    )}

                    {todo?.date && (
                      <div className="flex relative top-[7px]  gap-[3px] pb-[11px] items-center  ">
                        <AiOutlineCalendar className="text-[#776EC9]" />
                        <span className="font-inter font-semibold text-[11px] relative top-[1px]  text-[#776EC9]">
                          Due  {calculateDueTime(todo?.date) == 0 ? "Today" : " in " + calculateDueTime(todo?.date)}
                          {calculateDueTime(todo?.date) >= 1 && " days"}
                        </span>
                      </div>
                    )}

                    {todo?.subtasks?.map((todo: any) => (
                      <>
                        <div
                          className="flex items-center relative right-[7px]"
                          key={todo?._id}
                        >
                          {todo?.done ? (
                            <BiSolidCheckboxChecked
                              onClick={() => handleSubTaskDone(false, todo._id)}
                              className={
                                "cursor-pointer text-[#B5B5BA] w-[30px] h-[30px] rounded-2"
                              }
                            />
                          ) : (
                            <BiCheckbox
                              onClick={() => handleSubTaskDone(true, todo._id)}
                              className={
                                "cursor-pointer text-[#B5B5BA] w-[30px] h-[30px] rounded-2"
                              }
                            />
                          )}
                          <span
                            className={`mr-[6px] font-inter font-normal text-base leading-[18.11px] mt-[5px] ${todo?.done && "line-through text-[#B5B5BA]"
                              }`}
                          >
                            {todo?.task}
                          </span>
                        </div>
                      </>
                    ))}

                    {subTaskShow === todo.id && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault(), handleAddSubsTaskSubmit(todo.id);
                        }}
                        className="flex items-center relative mt-[7px] mb-[5px]"
                      >
                        <BiSolidCheckbox
                          className={
                            "cursor-pointer text-[#E2E2E2] w-[30px] h-[30px] relative right-[5px] rounded-2"
                          }
                        />
                        <input
                          type="text"
                          name=""
                          id=""
                          value={subTaskTodo}
                          placeholder="Add a Subtask..."
                          onChange={(e) => setSubTaskTodo(e.target.value)}
                          className=" bg-[#F4F4F4] border border-transparent focus:outline-none focus:transparent focus:transparent focus:border-transparent hover:outline-none hover:transparent hover:transparent hover:border-transparent w-full  font-inter font-normal text-[14px] leading-[18.11px]"
                        />
                      </form>
                    )}
                  </div>

                  <div className="ml-auto relative top-[14px] flex gap-[8px] mr-[3px]">
                    {updateInputShow === todo.id ? (
                      <>
                        <LuDelete
                          onClick={() => setUpdateInputShow("")}
                          className=" cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <GiConfirmed
                          onClick={() => handleUpdateSubmit(todo.id)}
                          className=" cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </>
                    ) : (
                      <>
                        <TbSubtask
                          onClick={() => handleAddSubTask(todo.id)}
                          className=" cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <BiSolidEdit
                          onClick={() => handleEditTodo(todo.id, todo.task)}
                          className=" cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        />

                        <RiDeleteBinLine
                          onClick={() => handleDeleteTodo(todo.id)}
                          className=" cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
