import ToDoItem from "./ToDoItem.jsx";
import deleteIcon from "./../../assets/images/icon-delete.svg";
import "./../../css/ToDoList.css";

export default function ToDosList({
  todos,
  onRemoveAllTodos,
  onChangeToDo,
  onDeleteToDo,
}) {
  

  return (
    <>
      <div className="toDoList__title">
        <div className="toDoList__subtitle">
          <h2>Tasks</h2>
          <button
            className="removeAllTasks__button"
            onClick={() => onRemoveAllTodos()}
          >
            <img
              src={deleteIcon}
              alt="delete icon"
              aria-label="Remove all tasks"
            />
          </button>
        </div>
        <div></div>
      </div>
      <div className="tasks__section">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="li__section">
              <ToDoItem
                todo={todo}
                onChange={onChangeToDo}
                onDelete={onDeleteToDo}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
