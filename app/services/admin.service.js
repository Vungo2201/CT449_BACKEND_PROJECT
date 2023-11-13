const { ObjectId } = require("mongodb");

class AdminService {
    constructor(client) {
        this.Admin = client.db().collection("NhanVien");
    }

    extracAdminData(payload) {
        const admin = {
            HoTenNV: payload.HoTenNV,
            ChucVu: payload.ChucVu,
            Email: payload.Email,
            Password: payload.Password,
            DiaChi: payload.DiaChi,
            SDT: payload.SDT
        };
        // Remove undefined fields
        Object.keys(admin).forEach(
            (key) => admin[key] === undefined && delete admin[key]
        );
        return admin;
    }
    async login(payload) {
        const isExist = await this.Admin.findOne({"Email": payload.Email.trim()});
        if(isExist === null)
            return false;
        else if(isExist.Password.trim() != payload.Password.trim()) 
            return false;
        else return true;
    }
}

module.exports = AdminService;