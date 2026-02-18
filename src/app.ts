import express from "express";
import routes from "./routes";
import {errorHandler} from "./middleware/validate";

const app = express();

app.use("/", routes);

app.use(errorHandler);

export default app;
