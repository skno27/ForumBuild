import express from "express";
// import cors from "cors";
import usersRouter from "./routes/users.js";
import logging from "./middleware/logging.js";
import errors from "./middleware/errors.js";
import xss from "./middleware/xss.js";

const app = express();
const port = 3000;
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Accept"],
//   })
// );

app.use(express.json());
app.use(xss);

app.use(logging.logRequest);
app.use("/users", usersRouter);
app.use(errors.errorHandler);

app.listen(port, () => {
  console.log(`App listening ... http://localhost:${port}.`);
});
