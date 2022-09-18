//? import dependencies
import express, { Handler } from "express";
import * as consoleLog from "./helpers/consoleLog";
import dotenv from "dotenv";
import "../database";

//? import routes
import { routes } from "./routes/routes";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);

//? middleware
app.use(express.json());

//? routes
app.use("/api", routes);

//? error handling
app.use((err, req, res, next) => {
	consoleLog.red("server", err.message);
	res.status(500).send("Internal server error");
});

// //? 404
// app.use((req, res) => {
// 	res.status(404).send("Not found");
// });

if (process.env.NODE_ENV == "production") {
	app.listen(app.get("port"), () => {
		consoleLog.green(
			"server",
			"Server started on port ".concat(app.get("port"))
		);
	});
}

export const handler: Handler = app;

//? export
export default app;