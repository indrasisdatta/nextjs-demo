export const fetchTodoList = async () => {
  const response = await fetch("https://dummyjson.com/todos");
  const data = await response.json();
  return data.todos;
};

export const fetchTodoDetails = async (id) => {
  const response = await fetch(`https://dummyjson.com/todo/${id}`);
  const data = await response.json();
  return data;
};
