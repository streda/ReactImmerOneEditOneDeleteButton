// import { useState } from 'react';
import { useImmer } from "use-immer";
import AddTodo from "./AddTodo.js";
import TaskList from "./TaskList.js";

let nextId = 3;
const initialTodos = [
  { id: 0, title: "Buy milk", done: true },
  { id: 1, title: "Eat tacos", done: false },
  { id: 2, title: "Brew tea", done: false }
];

export default function TaskApp() {
  const [todos, setTodos] = useImmer(initialTodos);
  const [selectedTodos, setSelectedTodos] = useImmer([]);

  function handleAddTodo(title) {
    if (title.trim() === "") {
      return;
    }
    setTodos((draft) => {
      draft.push({
        id: nextId,
        title: title.trim(),
        done: false
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    setTodos((draft) => {
      const todo = draft.find((element) => element.id === nextTodo.id);
      if (todo) {
        todo.title = nextTodo.title;
        todo.done = nextTodo.done;
      }
    });
  }

  function handleDeleteTodo() {
    setTodos((draft) => {
      for (let i = draft.length - 1; i >= 0; i--) {
        if (selectedTodos.includes(draft[i].id)) {
          draft.splice(i, 1);
        }
      }
    });
    setSelectedTodos([]); // clear selected todos after deletion
  }

  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        selectedTodos={selectedTodos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
        onSetSelectTodo={setSelectedTodos}
      />
    </>
  );
}
