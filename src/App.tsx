import { useState } from "react";
import Toast from "./components/Toast/Toast";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoHeader } from "./components/TodoHeader/TodoHeader";
import { TodoModal } from "./components/TodoModal/TodoModal";
import { useGetTodosQuery } from "./api/todoApi";
import useTheme from "./hooks/useTheme";
import plusSvg from "./assets/icons/plus.svg";
import { TodoService } from "./services/todoService";
import "./App.css";
import { Todo } from "./types";

/**
 * App Component
 * Handles the all state management, themes, filtering todo list
 *
 * @returns {JSX.Element}.
 */
export default function App(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { isDarkMode, toggleTheme } = useTheme();
  const { createTodo, updateTodoItem, deleteTodoItem, toggleTodoStatus } =
    TodoService();

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useGetTodosQuery({
    searchText,
    filter: selectedFilter,
  });

  const resetModal = () => {
    setShowModal(false);
    setEditingId(null);
    setTodoText("");
  };

  const handleAddOrUpdateTodo = async () => {
    if (editingId) {
      await updateTodoItem(editingId, todoText, resetModal);
    } else {
      await createTodo(todoText, resetModal);
    }
  };

  const handleEdit = (id: string) => {
    const todo = todos.find((t: Todo) => t._id === id);
    if (!todo) {
      Toast.showError("Todo not found!");
      return;
    }
    setTodoText(todo.text);
    setEditingId(id);
    setShowModal(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    Toast.showError("Failed to fetch todos. Please try again later.");
    return <div>Error loading todos.</div>;
  }

  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>
      <Toast />
      <div className="container">
        <h1>TODO LIST</h1>

        <TodoHeader
          searchText={searchText}
          onSearchChange={setSearchText}
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        <TodoList
          todos={todos}
          onToggle={toggleTodoStatus}
          onEdit={handleEdit}
          onDelete={deleteTodoItem}
          isDarkMode={isDarkMode}
        />

        <button
          className="add-button"
          onClick={() => {
            resetModal();
            setShowModal(true);
          }}
        >
          <img src={plusSvg} alt="Add" />
        </button>

        <TodoModal
          isOpen={showModal}
          title={editingId ? "EDIT NOTE" : "NEW NOTE"}
          todoText={todoText}
          onTextChange={setTodoText}
          onClose={resetModal}
          onSubmit={handleAddOrUpdateTodo}
        />
      </div>
    </div>
  );
}
