"use client";
import { useTodos } from "@/store/Todo";
import Accordion from "./Accordation";
import { useEffect, useState } from "react";
import DateCalendarValue from "./DatePicker";
import { BiSolidCheckbox } from "react-icons/bi";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

interface Todo {
  id: number;
  task: string;
  done: boolean;
}

interface TodoSection {
  section: string;
  todos: Todo[];
}

interface Subtask {
  id: number;
  task: string;
  done: boolean;
}

interface Todo {
  id: number;
  task: string;
  done: boolean;
  subtasks?: Subtask[]; // Added subtasks property
}

interface TodoSection {
  section: string;
  todos: Todo[];
}

const Todo = () => {
  const { todos }: any = useTodos();
  const [data, setData] = useState(todos);
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("");
  const { handleAddSection, fetchLoading } = useTodos();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleAddSection(section);
    setSection("");
    setShow(false);

  };

  useEffect(() => {
    setData(todos);
    setLoading(false)
  }, [todos]);

  return (
    <div className="flex justify-center items-center h-screen bg-slate-800 w-full">
      <div className="bg-[#F4F4F4] shadow-lg  rounded-lg w-[400px] h-[460px] mr-[1rem] ml-[1rem]">
        <div className="bg-black h-[14px] rounded-tl-none rounded-tr-none rounded-bl-[50%] rounded-br-[50%]"></div>

        <div className="m-[2rem] bg-[#F4F4F4] h-[400px] overflow-y-auto ">
          <>
            {loading ? (
              <Box className="w-full mb-[10px]">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </Box>
            ) : (
              <>
                {data?.map((section: any, index: any) => (
                  <div key={index}>
                    <Accordion datas={section} />
                  </div>
                ))}
              </>
            )}
          </>

          {!show && (
            <>
              {loading  ? (
                <Box className="w-full mb-[10px]">
                  <Skeleton animation="wave" />
                </Box>
              ) : (
                <div className="flex justify-center items-center">
                  <Button
                    variant="outlined"
                    className="text-[#413F3F66]  border-[#413F3F66] hover:outline-none hover:transparent hover:transparent hover:border-transparent"
                    startIcon={<AddIcon />}
                    onClick={(e) => setShow(true)}
                  >
                    Add Section
                  </Button>
                </div>
              )}
            </>
          )}

          {show && (
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
                  value={section}
                  placeholder="Write a Section..."
                  onChange={(event) => setSection(event.target.value)}
                  className="bg-[#F4F4F4] border border-transparent focus:outline-none focus:transparent focus:transparent focus:border-transparent w-full  font-inter font-normal text-[14px] leading-[18.11px]"
                />
              </form>
            </div>
          )}
          <DateCalendarValue />
        </div>
      </div>
    </div>
  );
};

export default Todo;
