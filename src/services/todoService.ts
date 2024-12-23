import {
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/todoApi";
import Toast from "../components/Toast/Toast";

/**
 * TodoService
 * This serices used for adding, updating, deleting, and toggling the completion status of todos.
 * - `createTodo`: Adds a new todo.
 * - `updateTodoItem`: Updates an existing todo.
 * - `deleteTodoItem`: Deletes a todo.
 * - `toggleTodoStatus`: Toggles the completion status of a todo.
 */
export const TodoService = () => {
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  /**
   * Adds a new todo item.
   * @param {string} todoText
   * @param {Function} resetModal
   */
  const createTodo = async (todoText: string, resetModal: () => void) => {
    if (!todoText.trim()) {
      Toast.showError("Todo text cannot be empty.");
      return;
    }

    try {
      await addTodo({ text: todoText });
      Toast.showSuccess("Todo added successfully!");
      resetModal();
    } catch (error) {
      Toast.showError("Failed to add the todo. Please try again.");
      console.error("Error adding todo:", error);
    }
  };

  /**
   * Updates an existing todo item.
   * @param {string | null} editingId
   * @param {string} todoText
   * @param {Function} resetModal
   */
  const updateTodoItem = async (
    editingId: string | null,
    todoText: string,
    resetModal: () => void
  ) => {
    if (!editingId) {
      Toast.showError("Invalid Todo ID for editing.");
      return;
    }
    try {
      await updateTodo({ _id: editingId, text: todoText });
      Toast.showSuccess("Todo updated successfully!");
      resetModal();
    } catch (error) {
      Toast.showError("Failed to update the todo. Please try again.");
      console.error("Error updating todo:", error);
    }
  };

  /**
   * Deletes a todo item.
   * @param {string} id -
   */
  const deleteTodoItem = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      await deleteTodo(id);
      Toast.showSuccess("Todo deleted successfully!");
    } catch (error) {
      Toast.showError("Failed to delete the todo. Please try again.");
      console.error("Error deleting todo:", error);
    }
  };

  /**
   * Toggles the completion status of a todo.
   * @param {string} _id
   * @param {boolean} completed
   */
  const toggleTodoStatus = async (_id: string, completed: boolean) => {
    try {
      await updateTodo({ _id, completed: !completed });
      Toast.showSuccess(
        `Todo marked as ${!completed ? "completed" : "incomplete"}!`
      );
    } catch (error) {
      Toast.showError("Failed to toggle todo status.");
      console.error("Error toggling todo:", error);
    }
  };

  return {
    createTodo,
    updateTodoItem,
    deleteTodoItem,
    toggleTodoStatus,
  };
};
