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

router.route("/users/signup")
    .post(users.signup);
router.route("/users/login")
    .post(users.login);
    
router.route("/admin/login")
    .post(admin.login);

module.exports = router;