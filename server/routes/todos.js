import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controller/todos.js";
const router = express.Router();

// Get all list
router.get("/", getTodos);

// Create todo
router.post("/", createTodo);

// Update todo list
router.patch("/:id", updateTodo);

// Delete todo list
router.delete("/:id", deleteTodo);

export default router;
