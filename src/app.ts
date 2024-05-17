import express from "express";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
import repliesRouter from "./routes/replies.js";
import authRouter from "./routes/auth.js";
import logging from "./middleware/logging.js";
import errors from "./middleware/errors.js";
import xss from "./middleware/xss.js";
import notFound from "./middleware/notFound.js";
import authenticated from "./middleware/loginAuth.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(xss);
app.use(logging.logRequest);

// sample middleware -- will be replaced with userId grab from authentication middleware
// app.use((req, res, next) => {
//   req.user = {
//     userId: 6,
//   };
//   next();
// });

// login router
app.get("/", (req, res) => {
  res.json({ message: "hello!" });
});
app.use("/v1/auth", authRouter);

app.use(authenticated);

app.use("/v1/users", usersRouter);
app.use("/v1/posts", postsRouter);
app.use("/v1/replies", repliesRouter);
app.use(errors.errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`App listening ... http://localhost:${port}.`);
});
