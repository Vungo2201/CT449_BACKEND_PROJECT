const express = require("express");
const products = require("../controllers/products.controller");
const users = require("../controllers/users.controller");
const admin = require("../controllers/admin.controller");

const router = express.Router();

router.route("/products")
    .get(products.findAll)
    .post(products.create);

router.route("/products/:id")
    .get(products.findOne)
    .put(products.update)
    .delete(products.delete);

router.route("/users")
    .post(users.signup)
    .get(users.login);

router.route("/admin")
        .get(admin.adminlogin);

module.exports = router;