const express = require("express");
const router = express.Router();
const ProductsController = require('../controllers/global');

router.get("/typeahead/:prefix?", ProductsController.get_by_prefix);

router.post("/typeahead", ProductsController.create_name);

module.exports = router;