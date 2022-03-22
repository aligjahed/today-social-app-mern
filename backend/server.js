const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

const Port = process.env.PORT;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));

app.use(errorHandler);

app.listen(Port, console.log(`Server running on port ${Port}`));
