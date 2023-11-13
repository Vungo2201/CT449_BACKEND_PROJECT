const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("KhachHang");
    }

    extracUserData(payload) {
        const user = {
            HoTenKH: payload.HoTenKH,
            Email: payload.Email,
            Password: payload.Password,
            DiaChi: payload.DiaChi,
            SDT: payload.SDT
        };
        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }
    async signup(payload) {
        const user = this.extracUserData(payload);
        const isExist = await this.User.findOne({"Email": user.Email});
        console.log(isExist);
        if(isExist !== null) 
            return false;
        else { 
            const result = await this.User.findOneAndUpdate(
                user,
                { $set: {} },
                { returnDocument: "after", upsert: true }
            );
            return result;
        }
    }
    async login(payload) {
        const isExist = await this.User.findOne({"Email": payload.Email.trim()});
        if(isExist === null)
            return false;
        else if(isExist.Password.trim() != payload.Password.trim()) 
            return false;
        else return true;
    }
}

module.exports = UserService;