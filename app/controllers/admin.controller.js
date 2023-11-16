const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const AdminService = require("../services/admin.service");
exports.login = async (req, res, next) => {
    try {
        const  adminService = new AdminService(MongoDB.client);
        const check = await adminService.login(req.body);
        if(!check)
            return res.send("Email hoặc tài khoản không đúng");
        return res.send("Đăng nhập thành công")
    } catch (error) {
        return next(
            new ApiError(500, "Một lỗi đã xảy ra khi đăng nhập")
        );
    }
}