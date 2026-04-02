import express from "express";
import routes from "./routes";
import { errorHandler } from "./middleware/validate";
import path from "path";

const app = express();

app.use(express.json());

app.use("/", routes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(errorHandler);

export default app;