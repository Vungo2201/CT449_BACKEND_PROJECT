const express = require("express");
const cors = require("cors");
const appRouter = require("./app/routes/app.route")
const {error} = require("console");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/shopAPI", appRouter);

app.get("/",(req, res) => {
    res.json({message: "Chào mừng đến với ứng dụng của shop"});
});


app.use((req, res, next) => {
    return next(new ApiError(404, "Không tìm thấy tài nguyên"));
});
app.use((err, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Lỗi máy chủ xảy ra",
    });
});
    
module.exports = app;