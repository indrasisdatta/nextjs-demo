import React from "react";
import { DoneCheckbox } from "./DoneCheckbox";
import Link from "next/link";
import { fetchTodoList } from "@/services/TodoApiService";

const TodoList = async () => {
  const todoList = await fetchTodoList();

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Done
                  </th>
                </tr>
              </thead>
              <tbody>
                {todoList.map((todo, index) => (
                  <tr
                    key={todo.id}
                    className="border-b dark:border-neutral-500"
                  >
                    <td className="whitespace-nowrap px-6 py-2 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-2">
                      <Link href={`/todo/${todo.id}`}>{todo.todo}</Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-2">
                      <DoneCheckbox todo={todo} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const metadata = {
//   title: "To do list",
//   description: "List of to do tasks",
// };

export const generateMetadata = () => {
  return {
    title: "Todo list",
  };
};

export default TodoList;
