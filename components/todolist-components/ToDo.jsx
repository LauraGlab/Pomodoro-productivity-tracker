import { useLocalStorage } from "../../contexts/useLocalStorage";
import AddTodo from "./AddToDo";
import ToDosList from "./ToDosList";
import "./../../css/ToDoList.css";

/*bc they have to access to every todo components*/
let nextId = 1;
const initialTodos = [{ id: 0, title: "Study :)", done: false }];

export default function ToDo() {
  const [todos, setTodos] = useLocalStorage("todos", initialTodos);
  let completedTasks = 0;

  todos.map((todo) => {
    if (todo.done) {
      completedTasks = completedTasks + 1;
    }
    return completedTasks;
  });

  function addToDo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false,
      },
    ]);
  }

  function removeAllTodos() {
    if (todos.length > 0) {
      let result = confirm("Are you sure you want to delete all the tasks?");
      if (result === true) {
        setTodos([]);
      }
    }
  }

  function editToDo(nextTodo) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === nextTodo.id) {
          return nextTodo;
        } else {
          return todo;
        }
      })
    );
  }

  function deleteToDo(todoId) {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  return (
    <>
      {todos.length === 0 ? (
        <h4 className="textTask">Write tasks below!</h4>
      ) : (
        <h4 className="textTask">
          {completedTasks} completed {completedTasks === 1 ? "task" : "tasks"}{" "}
          out of {todos.length} {todos.length === 1 ? "task" : "tasks"} in total
        </h4>
      )}
      <div className="toDoList__section">
        <ToDosList
          todos={todos}
          onRemoveAllTodos={removeAllTodos}
          onChangeToDo={editToDo}
          onDeleteToDo={deleteToDo}
        />
        <AddTodo onAddToDo={addToDo} />
      </div>
    </>
  );
}
