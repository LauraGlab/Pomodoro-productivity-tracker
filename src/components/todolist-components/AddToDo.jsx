import { useState } from "react";
import "./../../css/AddToDo.css";

export default function AddTodo({ onAddToDo }) {
  const [title, setTitle] = useState("");

  function addingToDo(){
          setTitle("");
          onAddToDo(title);
        }

  return (
    <div className="input__section">
      <input
        className="taskInput"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="addButton"
        onClick={() => {
          addingToDo();
        }}
        disabled={title.length === 0}
      >
        Add Task
      </button>
    </div>
  );
}

