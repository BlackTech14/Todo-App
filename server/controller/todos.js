import Todo from "../models/Todo.js";

/**
 * Fetches all todos based.
 * If a search query is provided, get todos based on the search.
 */

export const getTodos = async (req, res) => {
  try {
    const { searchText, filter } = req.query;
    let query = {};

    // Handle search filter
    if (searchText) {
      query.text = { $regex: searchText, $options: "i" }; // Case-insensitive search
    }

    if (filter && filter !== "all") {
      const isCompleted = filter === "completed";
      query.completed = isCompleted;
    }

    // Fetch todos based on the query
    const todos = await Todo.find(query);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Creates a new todo list.
 */
export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      completed: false,
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Updates an todo list by id.
 *
 */
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      todo.text = req.body.text ?? todo.text;
      todo.completed = req.body.completed ?? todo.completed;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Deletes an existing todo item by ID.
 *
 */
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      await todo.deleteOne();
      res.json({ message: "Todo deleted" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
