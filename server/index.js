const express = require("express");
const app = express();
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes.js");

const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});
