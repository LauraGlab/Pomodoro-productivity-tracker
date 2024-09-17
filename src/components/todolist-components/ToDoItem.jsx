import { useState, useEffect, useRef } from "react";
import deleteIcon from "./../../assets/images/icon-delete.svg";
import editIcon from "./../../assets/images/icon-edit.svg";
import "./../../css/ToDoItem.css";

export default function ToDoItem({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
let menuRef = useRef();

useEffect(() => {
  let handler = (e) => {
    if (!menuRef.current.contains(e.target)) {
    onCloseOutside(e);
    }
  };
  document.addEventListener("mousedown", handler);
  return () => {
    document.removeEventListener("mousedown", handler);
  };
});

function onCloseOutside() {
    let result = confirm("Are you sure you want to close it?");
    if (result === true) {
      setIsEditing(false);
    }
}

  if (isEditing) {
    todoContent = (
      <div className="edit__section" ref={menuRef}>
        <input
          className="editInput"
          value={todo.title}
          onChange={(e) => {
            onChange({
              ...todo,
              title: e.target.value,
            });
          }}
        />
        <button
          className="saveBtn"
          onClick={() => setIsEditing(false)}
          disabled={todo.title.length === 0}
          aria-label="Save changes"
        >
          Save
        </button>
      </div>
    );
  } else {
    todoContent = (
      <>
        <div className="titleTask">{todo.title}</div>
        <button className="editBtn" onClick={() => setIsEditing(true)} aria-label="Edit task">
          <img src={editIcon} alt="edit icon" />
        </button>
      </>
    );
  }

  return (
    <div className="task__section">
      <input
        className="checkTask"
        type="checkbox"
        checked={todo.done}
        onChange={(e) => {
          onChange({
            ...todo,
            done: e.target.checked,
          });
        }}
      />
      <div className="textOfTask">{todoContent}</div>
      <button className="deleteBtn" onClick={() => onDelete(todo.id)}>
        <img src={deleteIcon} alt="delete icon" aria-label="Delete task" />
      </button>
      {todo.title.length === 0 && <p className="errorText">Task can't be empty.</p>}
    </div>
  );
}
