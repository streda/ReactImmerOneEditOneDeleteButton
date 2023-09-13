import { useState } from "react";

export default function TaskList({
  todos,
  selectedTodos,
  onChangeTodo,
  onDeleteTodo,
  onSetSelectTodo
}) {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Task
              todo={todo}
              selectedTodos={selectedTodos}
              onChangeTodo={onChangeTodo}
              onSetSelectTodo={onSetSelectTodo}
              isEditing={isEditing && editingTodoId === todo.id}
              setEditingTodoId={setEditingTodoId}
            />
          </li>
        ))}
      </ul>

      {/* EDIT button here */}
      <button
        onClick={() => {
          setEditingTodoId(selectedTodos[0]);
          setIsEditing(true);
        }}
        disabled={selectedTodos.length !== 1}
      >
        Edit
      </button>

      {/* DELETE button here */}
      <button onClick={onDeleteTodo} disabled={selectedTodos.length === 0}>
        Delete
      </button>
    </div>
  );
}

function Task({
  todo,
  selectedTodos,
  onChangeTodo,
  onSetSelectTodo,
  isEditing,
  setEditingTodoId
}) {
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={(e) => {
            onChangeTodo({
              ...todo,
              title: e.target.value
            });
          }}
        />
        <button onClick={() => setEditingTodoId(null)}>Save</button>
      </>
    );
  } else {
    todoContent = <>{todo.title}</>;
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={selectedTodos.includes(todo.id)}
        onChange={(e) => {
          if (e.target.checked) {
            onSetSelectTodo((allCurrentlySelected) => {
              return [...allCurrentlySelected, todo.id];
            });
          } else {
            onSetSelectTodo((allCurrentlySelected) =>
              allCurrentlySelected.filter((id) => id !== todo.id)
            );
          }
        }}
      />
      {todoContent}
    </label>
  );
}
