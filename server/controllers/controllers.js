const pool = require("../db/db.js");

const createTodo = async (req, res) => {
	try {
		const { description } = req.body;
		console.log(description);

		if (!description || typeof description !== "string") {
			return res
				.status(400)
				.json({ error: "Description is required and should be a string" });
		}
		const result = await pool.query(`INSERT INTO todo (description) VALUES ($1) RETURNING *`, [
			description,
		]);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error details: ", err);
		res.status(500).json({ error: err });
	}
};

const getTodos = async (_, res) => {
	try {
		const queryTodo = await pool.query("SELECT * FROM todo");
		res.status(200).json(queryTodo.rows);
	} catch (err) {
		console.log("Error details: ", err);
		res.status(500).json({ error: err });
	}
};

const getTodoById = async (req, res) => {
	try {
		console.log(req.params);
		const todoId = req.params.id;
		const sqlQuery = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)", [todoId]);
		res.status(200).json(sqlQuery.rows[0]);
	} catch (err) {
		console.log("Error details: ", err);
		res.status(500).json({ error: err });
	}
};

const updateTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;

		const updateSql = await pool.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
			[description, id]
		);

		if (updateSql.rowCount === 0) {
			return res.status(404).json({ error: "Todo not found or no changes made" });
		}

		console.log(updateSql.rows[0]);

		res.status(200).json(updateSql.rows[0]);
	} catch (err) {
		console.log("Error details: ", err);
		res.status(500).json({ error: err });
	}
};

const deleteTodoById = async (req, res) => {
	try {
		const { id } = req.params;
		const deleteSqlData = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

		if (deleteSqlData.rowCount === 0) {
			return res.status(404).json({ error: "Todo not found." });
		}

		res.status(200).json({ message: "Todo was deleted." });
	} catch (err) {
		console.log("Error details: ", err);
		res.status(500).json({ error: err });
	}
};

module.exports = { createTodo, getTodos, getTodoById, updateTodo, deleteTodoById };
