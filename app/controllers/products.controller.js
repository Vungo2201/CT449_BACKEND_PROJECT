const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ProductService = require("../services/product.service");
exports.create = async (req, res, next) => {
    if (!req.body?.TenHH) {
        return next(new ApiError(400, "Tên sản phẩm không thể để trống!"));
    }
    try {
        const  productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Một lỗi đã xảy ra khi thêm 1 sản phẩm mới")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const  productService = new ProductService(MongoDB.client);
        const { TenHH } = req.query;
        if (TenHH) {
            documents = await productService.findByName(TenHH);
        } else {
            documents = await productService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất danh bạ")
        );
    }

    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try {
        const  productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không thể tìm thấy sản phẩm"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi đã xảy ra khi truy xuất sản phẩm với  id=${req.params.id}`
            )
        );
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Dữ liệu cập nhật không thể để trống"));
    }

    try {
        const  productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy sản phẩm"));
        }
        return res.send({ message: "Sản phẩm được cập nhật thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `lỗi xảy ra khi cập nhật sản phẩm với  id=${req.params.id}`)
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const  productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy sản phẩm"));
        }
        return res.send({ message: "Sản phẩm được xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Không thể xóa sản phẩm với id=${req.params.id}`
            )
        );
    }
};