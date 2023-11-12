const express = require("express");
const cors = require("cors");
const appRouter = require("./app/routes/app.route")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/shopAPI", appRouter);

app.get("/",(req, res) => {
    res.json({message: "Welcom to shop application"});
});

module.exports = app;