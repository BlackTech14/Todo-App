import React from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import { Todo } from "../../types";
import "./TodoList.css";
import emptyListLightImage from "../../assets/images/emptyLight.png";
import emptyListDarkImage from "../../assets/images/emptyDark.png";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDarkMode: boolean;
}
/**
 * TodoList Component
 *
 * Displays a list of todos. If no todos are available, shows an empty state with a message and image.
 */

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onEdit,
  onDelete,
  isDarkMode,
}) => {
  return (
    <div className={todos.length > 0 ? "todos-list" : "todos-list-empty"}>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="empty-list">
          <img
            src={isDarkMode ? emptyListDarkImage : emptyListLightImage}
            alt="Empty List"
          />
          <p>Empty...</p>
        </div>
      )}
    </div>
  );
};
