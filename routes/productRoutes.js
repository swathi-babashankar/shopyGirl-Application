const express = require("express");
const {upload} = require("../methods/multerMiddleware.js")

 const {createProduct, getProducts, getProductById, updateProductById, updateProductByBrand, deleteProduct, searchProduct} = 
require("../controllers/productController");

const {adminAuth} = require("../authentication/adminAuth");
const router = express.Router();

router.post("/createProduct/:adminId?", 
adminAuth,()=>{upload.single("image"); }, createProduct );
// upload.single("image"),
router.get("/getProducts", getProducts);
router.get("/getProductById/:productId?", getProductById);
router.put("/updateProductById/:adminId?/:productId?", adminAuth,
upload.single("image"), updateProductById);
// create admin and add adminId make this private doing so
router.put("/updateProductByBrand/:adminId?",adminAuth, updateProductByBrand);
router.delete("/deleteProduct/:adminId?/:productId?",adminAuth, deleteProduct);
router.post("/searchProduct", searchProduct);

module.exports = router;
















