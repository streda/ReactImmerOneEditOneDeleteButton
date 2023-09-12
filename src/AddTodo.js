import { useState } from "react";

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState("");

  // Check if the trimmed title is empty
  const isDisabled = title.trim() === "";

  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={() => {
          setTitle("");
          onAddTodo(title);
        }}
        // Disable button if title is empty or whitespace
        disabled={isDisabled}
      >
        Add
      </button>
    </>
  );
}
