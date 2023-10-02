const express = require("express");

 const {createProduct, getProducts, getProductById, updateProductById, updateProductByBrand, deleteProduct, searchProduct} = 
require("../controllers/productController.js");

const router = express.Router();

router.post("/createProduct/:adminId?", createProduct);
router.get("/getProducts", getProducts);
router.get("/getProductById/productId", getProductById);
router.put("/updateProductById/:adminId?/:productId?", updateProductById);
// create admin and add adminId make this private doing so
router.put("/updateProductByBrand/:adminId?", updateProductByBrand);
router.delete("/deleteProduct/:adminId?/:productId?", deleteProduct);
router.get("/searchProduct", searchProduct);

module.exports = router;

// Not completed - Create admin and add adminIds for protected routes