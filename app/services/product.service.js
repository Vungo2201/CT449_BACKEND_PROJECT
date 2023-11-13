const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("HangHoa");
    }

    extracProductData(payload) {
        const product = {
            TenHH: payload.TenHH,
            Gia: payload.Gia,
            MotaHH: payload.MotaHH,
            SoLuongHang: payload.SoLuongHang,
            GhiChu: payload.GhiChu,
            HinhHH: payload.HinhHH,
        };
        // Remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }

    async create(payload) {
        const product = this.extracProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            product,
            { $set: { GhiChu: product.GhiChu = "Còn Hàng" } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

    async findByName(TenHH) {
        return await this.find({
            TenHH: { $regex: new RegExp(TenHH), $option: "i" },
        });
    }

    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extracProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}

module.exports = ProductService;