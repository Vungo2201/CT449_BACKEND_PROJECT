const express = require("express");
const cors = require("cors");
const appRouter = require("./app/routes/app.route")
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/shopAPI", appRouter);

app.get("/",(req, res) => {
    res.json({message: "Welcom to shop application"});
});


app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});
    
module.exports = app;