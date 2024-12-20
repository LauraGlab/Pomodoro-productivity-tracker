import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTodosChange } from "../../../contexts/TodoContext.jsx";
import closeIcon from "./../../../assets/images/icon-close.svg";
import "./../../../css/todolist/todomodals/DetailTodoModal.css";

export default function DetailTodoModal({ onClose, todo}) {
  const { todos, setTodos } = useTodosChange();

  return (
    <div className="backgroundBlur">
      <AnimatePresence>
        <motion.div
          key="modal"
          className="windowTodo"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <div className="detailClose__section">
            <h2>Details</h2>
            <img className="detailClose" src={closeIcon} onClick={onClose} />
          </div>
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>
                  <p title={todo.title}>{todo.title}</p>
                </th>
              </tr>
              <tr>
                <th>category</th>
                <th>
                  <img className="detailImg" src={todo.category} />
                </th>
              </tr>
              <tr>
                <th>done?</th>
                <th>
                  <p>{todo.done ? <p>yes</p> : <p>no</p>}</p>
                </th>
              </tr>
              <tr>
                <th>priority</th>
                <th>
                  {todo.priority === "" ? (
                    <p>none</p>
                  ) : (
                    <p>{todo.priority.toLocaleString()}</p>
                  )}
                </th>
              </tr>
            </thead>
          </table>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
