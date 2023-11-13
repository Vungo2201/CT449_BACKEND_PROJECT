const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Kết nối với cơ sở dữ liệu thành công!");
        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Máy chủ đang chạy ở cổng: ${PORT}`);
        });
    }catch(error){
        console.log("Không thể kết nối với cơ sở dữ liệu!",error);
        process.exit();
    }
}

startServer();