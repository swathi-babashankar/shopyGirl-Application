const express = require("express");

 const {createProduct, getProducts, getProductById, updateProductById, updateProductByBrand, deleteProduct, searchProduct} = 
require("../controllers/productController.js");

const router = express.Router();



// module.exports = router;