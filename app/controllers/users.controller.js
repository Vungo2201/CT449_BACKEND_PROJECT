const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const UserService = require("../services/user.service");
exports.signup = async (req, res, next) => {
    if (!req.body?.HoTenKH) {
        return next(new ApiError(400, "Tên khách hàng không thể để trống!"));
    }
    try {
        const  userService = new UserService(MongoDB.client);
        const document = await userService.signup(req.body);
        console.log(document);
        if(document)
            return res.send(document);
        else return res.send("Tài khoản này đã tồn tại");
    } catch (error) {
        return next(
            new ApiError(500, "Một lỗi đã xảy ra khi đăng ký")
        );
    }
}