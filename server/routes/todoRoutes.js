const {
	createTodo,
	getTodos,
	getTodoById,
	updateTodo,
	deleteTodoById,
} = require("../controllers/controllers.js");
const express = require("express");
const router = express.Router();

// create a todo
router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodoById);

module.exports = router;
