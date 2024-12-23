import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos.js";
import { ConnectDB } from "./db/connection.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
ConnectDB();

// Routes for todo lists
app.use("/api/todos", todoRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
