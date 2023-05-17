require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

//DB
const sequelize = require("./DB/connectDB");

//Middlewares
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

//Authorization
const auth = require("./middleware/auth");

//Router
const userRouter = require("./router/userRouter");
const notesRouter = require("./router/notesRouter");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", auth, notesRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    const port = process.env.PORT || 5050;

    await sequelize.authenticate();
    console.log("Connected to DB....");

    app.listen(port, () => {
        console.log(`Serer is listening on port ${port}.........`);
    });
};
start();
