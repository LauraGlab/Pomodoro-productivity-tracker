import React, { useState, useRef} from "react";
import Draggable from "react-draggable";
import { AnimatePresence, motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { useTodosChange } from "../../contexts/TodoContext.jsx"; 
import DeleteTodoModal from "./todomodals/DeleteTodoModal.jsx";
import DetailTodoModal from "./todomodals/DetailTodoModal.jsx";
import EditTodoModal from "./todomodals/EditTodoModal.jsx";
import deleteIcon from "./../../assets/images/icon-delete.svg";
import dotsIcon from "./../../assets/images/icon-threeDots.svg";
import editIcon from "./../../assets/images/icon-edit.svg";
import eyeIcon from "./../../assets/images/icon-eye.svg";
import "react-swipeable-list/dist/styles.css";
import "./../../css/todolist/ToDoItem.css";


export default function ToDoItem({todo}) {
  const [menuState, setMenuState] = useState({main: false, edit: false, delete: false, detail: false});
  const { todos, setTodos } = useTodosChange();
  const [editingTodoId, setEditingTodoId] = useState("");
  const [newValue, setNewValue] = useState({title: "", category: "", priority: ""});
  const [isDrag, setIsDrag] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [percent, setPercent] = useState(0);
  const [left, setLeft] = useState(0);
  const itemRef = useRef();
  const actionRef = useRef();

  const startEditing = (todoId, title, category, priority) => {
    setEditingTodoId(todoId);
    setNewValue({ title, category, priority });
  };

  const updateTodoItem = (nextTodo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === nextTodo.id) {
          return nextTodo;
        } else {
          return todo;
        }
      })
    );
  };

  const handleStart = () => {
    setIsDrag(true);
  };

  const handleStop = () => {
    if (percent > 10) {
      setIsActionOpen(true);
      const w = actionRef.current.offsetWidth;
      const leftWithAction = left > 0 ? w : w * -1;
      setLeft(leftWithAction);
    } else {
      setLeft(0);
    }
    setIsDrag(false);
  };

  const handleDrag = (e, data) => {
    const w = itemRef.current.offsetWidth;
    const x = data.x < 0 ? data.x * -1 : data.x;
    const p = (x / w) * 100;

    setPercent(p);
    setLeft(data.x);
  };

  const openMenu = (menu) => {
    setMenuState((prev) => ({ ...prev, [menu]: true }));
  };

  const closeMenu = (menu) => {
    setMenuState((prev) => ({ ...prev, [menu]: false }));
  };

  const toggleMainMenu = () => {
    setMenuState((prevState) => ({
      ...prevState,
      main: !prevState.main,
    }));
  };

  return (
    <>
      <div className="swipe-list">
        <div className="boxAction" ref={actionRef}>
          <div className="btnSwipe">
            <button
              className="deleteItemBtn"
              onClick={() => openMenu("delete")}
            >
              <SVG src={deleteIcon} alt="delete icon" />
            </button>
          </div>
        </div>
        <div className="boxSecondAction" ref={actionRef}>
          <div className="btnSwipeSecond">
            <button
              className="editBtn"
              onClick={() => {
                startEditing(todo.id, todo.title, todo.category, todo.priority);
                openMenu("edit");
              }}
              aria-label="Edit task"
            >
              <SVG src={editIcon} alt="edit icon" />
            </button>
          </div>
        </div>
        <div className="item-group">
          <Draggable
            axis="x"
            handle=".item"
            defaultPosition={{ x: 0, y: 0 }}
            position={{ x: left, y: 0 }}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}
          >
            <div>
              <div
                ref={itemRef}
                className="item"
                style={{ transform: `translate3d(${left}px, 0, 0px)` }}
              >
                <div className={`itemFirstSection priority-${todo.priority}`}>
                  <input
                    className="checkTask"
                    type="checkbox"
                    checked={todo.done}
                    name="checkTaskName"
                    onChange={(e) => {
                      updateTodoItem({
                        ...todo,
                        done: e.target.checked,
                      });
                    }}
                  />
                  <div className="categoryTask">
                    <SVG src={todo.category} width={30} height={30} />
                  </div>
                  <div className="textOfTaskContainer">
                    <p className="textOfTask">{todo.title}</p>
                  </div>
                </div>
                <div className="itemSecond__section">
                  <button className="menuBtn" onClick={toggleMainMenu}>
                    <SVG
                      className="svgTwoIcon"
                      src={dotsIcon}
                      width={20}
                      height={20}
                      alt="menu icon"
                      aria-label="Open the menu"
                      title="Open the menu"
                    />
                  </button>
                </div>
              </div>
            </div>
          </Draggable>
          {menuState.main && (
            <AnimatePresence>
              <motion.div
                key="modal"
                className="windowSecond"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
              >
                <button
                  className="windowSecondBtn"
                  onClick={() => {
                    setMenuState({ detail: true });
                  }}
                >
                  <SVG
                    className="menuTaskEye"
                    src={eyeIcon}
                    alt="eye icon"
                    width={18}
                    height={18}
                  />
                  <p>Task Detail</p>
                </button>
                <button
                  className="windowSecondBtn"
                  onClick={() => {
                    startEditing(todo.id, todo.title, todo.category, todo.priority);
                    openMenu("edit");
                  }}
                >
                  <SVG
                    className="menuTaskSvg"
                    src={editIcon}
                    alt="edit icon"
                    width={15}
                    height={15}
                  />
                  <p>Edit Task</p>
                </button>
                <button
                  className="windowSecondBtn"
                  onClick={() => {
                    setMenuState({ delete: true });
                  }}
                >
                  <SVG
                    className="menuTaskSvg"
                    src={deleteIcon}
                    alt="delete icon"
                    width={15}
                    height={15}
                  />
                  <p>Delete Task</p>
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
      {menuState.edit && (
        <EditTodoModal
          onClose={() => closeMenu("edit")}
          newValue={newValue}
          setNewValue={setNewValue}
          editingTodoId={editingTodoId}
          setEditingTodoId={setEditingTodoId}
        />
      )}
      {menuState.detail && (
        <DetailTodoModal onClose={() => closeMenu("detail")} todo={todo} />
      )}
      {menuState.delete && (
        <DeleteTodoModal onClose={() => closeMenu("delete")} todo={todo} />
      )}
    </>
  );
}
