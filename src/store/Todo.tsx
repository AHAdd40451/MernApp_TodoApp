"use client";
import {
  ReactNode,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";

export type todosContext = {
  todos: any;
  handleAddTodo: (section: string, task: string, done: boolean) => void;
  handleTaskComplete: (status: boolean, id: any) => void;
  handleDelete: (id: any) => void;
  handleUpdate: (task: string, id: any) => void;
  handleDate: any;
  openModal: boolean;
  HandleCalendar: any;
  setOpenModal: any;
  handleAddSection: any;
  handleAddSubTaskTodo: (id: any, task: string, done: boolean) => void;
  handleSubTaskComplete: (status: boolean, id: any) => void;
};

export const todosContext = createContext<todosContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<any>([]);
  const [date, setDate] = useState<any>([]);
  const [openModal, setOpenModal] = useState<any>(null);
  const BASE_URL = process.env.BASE_URL;

  const getTodo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/todo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setTodos(result);
    } catch (error) {
      console.log(error, "ClientApierror");
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const handleAddTodo = async (
    section: string,
    task: string,
    done: boolean
  ) => {
    if (!task) return;
    try {
      const response = await fetch(`${BASE_URL}/api/todo`, {
        method: "POST",
        body: JSON.stringify({ task, done, section, date }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      getTodo();
      console.log(result, "result");
    } catch (error) {
      console.log(error, "ClientApierror");
    }
  };

  const handleAddSection = async (section: string) => {
    if (!section) return;
    try {
      const response = await fetch(`${BASE_URL}/api/section`, {
        method: "POST",
        body: JSON.stringify({ section }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      getTodo();

      console.log(result, "result");
    } catch (error) {
      console.log(error, "ClientApierror");
    }
  };

  const handleTaskComplete = async (status: boolean, id: any) => {
    try {
      const response = await fetch(`${BASE_URL}/api/todo`, {
        method: "PUT",
        body: JSON.stringify({ status, id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      getTodo();

      console.log(result, "result");
    } catch (error) {
      console.log(error, "ClientApierror");
    }
  };

  const handleSubTaskComplete = async (status: boolean, id: any) => {
  
    try {
      const response = await fetch(`${BASE_URL}/api/updateSubstask`, {
        method: "PUT",
        body: JSON.stringify({ substaskId: id, status }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      getTodo();

      console.log(result, "result");
    } catch (error) {
      console.log(error, "ClientApierror");
    }
  };

  const handleUpdate = async (task: string, id: any) => {
    if (task === "") return;
    try {
      const response = await fetch(`${BASE_URL}/api/todo`, {
        method: "PUT",
        body: JSON.stringify({ task, id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      getTodo();
      console.log(result, "result");
    } catch (error) {
      console.log(error, "ClientApierror");
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`${BASE_URL}/api/todo`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      getTodo();

      console.log(result, "result");
    } catch (error) {
      console.log(error, "ClientApierror");
    }
  };

  const handleDate = (value?: any) => {
    setDate(value.toDate());
  };

  const HandleCalendar = (value: boolean) => {
    setOpenModal(value);
  };

  const handleAddSubTaskTodo = async (id: any, task: string, done: boolean) => {
    if (!task) return;
    try {
      const response = await fetch(`${BASE_URL}/api/updateSubstask`, {
        method: "PUT",
        body: JSON.stringify({ id, task, done, date }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      getTodo();

      console.log(result, "result");
    } catch (error) {
      console.log(error, "ClientApierror");
    }
  };

  return (
    <todosContext.Provider
      value={{
        todos,
        handleAddTodo,
        handleTaskComplete,
        handleDate,
        openModal,
        HandleCalendar,
        setOpenModal,
        handleAddSection,
        handleDelete,
        handleUpdate,
        handleAddSubTaskTodo,
        handleSubTaskComplete,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};

export function useTodos() {
  const todosContextValues = useContext(todosContext);
  if (!todosContextValues) {
    throw new Error("useTodos must be used within TodosProvider");
  }

  return todosContextValues;
}
