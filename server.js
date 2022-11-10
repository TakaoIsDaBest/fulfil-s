import "dotenv/config";
import express from "express";
import cors from "cors";

import db from "./config/db.js";

db.connect();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/todos", require("./routes/goalRoutes"));

// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on ${PORT}.`);
});
