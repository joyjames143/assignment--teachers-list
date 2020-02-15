const express = require("express");
const bodyParser = require("body-parser");
const teachersRouter = require("./routers/teachersRouter");
const teacherRouter = require("./routers/teacherRouter");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/teachers", teachersRouter);

app.use("/teacher", teacherRouter);

const server = app.listen(8080, () => {
  console.log(`Server running in port ${server.address().port}`);
});
