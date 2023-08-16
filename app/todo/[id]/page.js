import { fetchTodoDetails, fetchTodoList } from "@/services/TodoApiService";
import React from "react";

const TodoDetails = async ({ params }) => {
  const todoDetails = await fetchTodoDetails(params.id);

  return (
    <div>
      <h4>To do {todoDetails.id}</h4>
      <p>{todoDetails.todo}</p>
      <p>Status: {todoDetails.completed ? "Done" : "In progress"}</p>
    </div>
  );
};

export const generateMetadata = ({ params }) => {
  return {
    title: `Todo id ${params.id}`,
    description: `Todo details id ${params.id}`,
  };
};

export async function generateStaticParams() {
  const todoList = await fetchTodoList();
  return todoList.map((todo) => ({ id: todo.id.toString() }));
}

export default TodoDetails;
