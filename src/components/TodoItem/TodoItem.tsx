import React from "react";
import { Todo } from "../../types";

import EditLightSvg from "../../assets/icons/edit-light.svg";
import deleteLightSvg from "../../assets/icons/delete-light.svg";
import "./TodoItem.css";
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * TodoItem Component
 *
 * Displays a todo with actions to toggle, edit, or delete.
 */
export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
        className="todo-checkbox"
      />
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      <div className="todo-actions">
        <button onClick={() => onEdit(todo._id)} className="icon-button">
          <img src={EditLightSvg} alt="Edit" />
        </button>
        <button onClick={() => onDelete(todo._id)} className="icon-button">
          <img src={deleteLightSvg} alt="Edit" />
        </button>
      </div>
    </div>
  );
};
