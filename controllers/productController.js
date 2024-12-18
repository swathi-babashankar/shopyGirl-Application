const product = require("../model/tshirtSchema");
const {cloudFileUpload, cloudFileDelete} = require("../services/cloudinaryHandler.js");
const Admin = require("../model/adminSchema")


exports.createProduct = async (req, res) => {

   try {

    const {name, brand, category, description, price, discount} = req.body;
    const {sizeAndStock} = req.body;
    console.log(req.body, name);
    const {adminId} = req.query;

    
   let parsed =  JSON.parse('['+ sizeAndStock + ']')
   console.log("parsed is", parsed);
//    console.log(parsed);

    if(!name || !brand || !category || !price || !sizeAndStock) {

        throw new Error("Please fill all the necessary fields")
    }

    if(!adminId){
        throw new Error("Please pass adminId")
    }

    const adminExist = await Admin.findById(adminId);

    if(!adminExist){
        throw new Error("Admin does not exist")
    }

    console.log("req.files is",req.file.path);
    const imageLocalPath = req.file?.path;

    console.log(imageLocalPath)
    
    if(!imageLocalPath){
        throw new Error("Sorry! We could not get the image path")
    }

    // const localFilePath = JSON.stringify(imageLocalPath)
    // console.log(localFilePath);
    const imageUploadResp = await cloudFileUpload(imageLocalPath);

    console.log("cloud resp");
    console.log("Upload response from cloudinary", imageUploadResp);

    if(!imageUploadResp){
        throw new Error("Image is required")
    }
     
    // Extracting the image url from cloudinary response stored
    // const url = imageUploadResp.url
    images = imageUploadResp.secure_url;
    const publicId = imageUploadResp.public_id

        const productCreated = await product.create({
            images,
            publicId,
            name, 
            brand,
            category,
            description,
            price,
            sizeAndStock: parsed,
            discount
        })
            
        
        res.status(202).json({
            success: true,
            message: "Product created successfully",
            productCreated
        })
        
        }

        catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            })

        }
    } 
   

exports.getProducts = async(req, res) => {

    try{

        const getAllprods = await product.find({})

        res.status(202).json({
            success: true,
            message: "Products fetched successfully",
            getAllprods
        })

    }

    catch(err){

        res.status(402).json({
            success: false,
            message: err.message
        })



    }
}

exports.getProductById = async(req, res) => {

    try{

        const {prodId} = req.query;
        const getProdById = await product.findById(prodId)

        // if(getProdById){
            res.status(202).json({
                success: true,
                message: "Products fetched successfully using productID",
                getProdById
            })
        // 

    }

    catch(err){

        res.status(402).json({
            success: false,
            message: err.message
        })

    }
}

exports.updateProductById = async(req, res) => {
    
    try{

        const { category, price, discount} = req.body;
        const {prodId, adminId} = req.query;

        console.log(req.query, req.body);

        if(!prodId || !adminId){
            throw new Error("Please pass product ID and admin ID")
        }

        const adminExist = await Admin.findById(adminId);

        if(!adminExist){
           throw new Error("Admin does not exist")
        }
        // => Shloud i add a field in schema inside image field as publicID and store ID of every image
        // 1.should i grab the existed image's public ID => existingImgId
        // 2.should i first delete the needed img from cloudinary using its public_id and destroy() method
        // 3.upload new image to cloudinary with predefined method cloudFileDelete()


        // how to ask user which field he want to update
        // what if we want to update image with formidable and remove old images
        if( !category || !price || !discount){
            throw new Error("Please fill necessary fields")
        }

        const findProduct = await product.findById(prodId)
        console.log(findProduct, findProduct.publicId);

        // Grabbing the public ID of existing image of the product we want to update
        const public_id = findProduct.publicId;

        // Deleting the existing image from cloudinary to update product 
        

        // if(imageLocalPath){
        const deleteExistingImg = await cloudFileDelete(public_id)
        console.log("Existing cloudinary image deleted", deleteExistingImg);

        console.log(req.file);
        const imageLocalPath = req.file?.path;

        console.log(imageLocalPath);

        const imageUpdate = await cloudFileUpload(imageLocalPath);

        images = imageUpdate.secure_url;
        const publicId = imageUpdate.public_id
        // }

        const productUpdated = await product.findByIdAndUpdate(prodId, {
            images,
            publicId,
            category,
            price,
            discount
        })

        res.status(202).json({
            success: true,
            message: "Product updated successfully",
            productUpdated
        })

    }

    catch(err){

        res.status(400).json({
            success: false,
            message: err.message
        })

    }
}

// In case we want to change the price or apply discount only on particular brand
exports.updateProductByBrand = async(req, res) => {

    try {

    const {brand, price, discount} = req.body;

    const {adminId} = req.query;

    if(!adminId){
        throw new Error("Please pass adminId")
    }

    const adminExist = await Admin.findById(adminId);

    if(!adminExist){
        throw new Error("Admin does not exist")
    }


    if(!brand || !price || !discount){
        throw new Error("Please fill all the fields if you want to update the product")
    }

    const productUpdated = await product.updateMany({brand}, {price, discount});

    res.status(202).json({
        success: true,
        message: "Product updated successfully :)",
        productUpdated
    })

    }

    catch(err){

        res.status(402).json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteProduct = async(req, res) =>{

    try {

    const {prodId, adminId} = req.query;
    
    if(!prodId){
        throw new Error("Sorry Product ID not found")
    }

    if(!adminId){
        throw new Error("Please pass adminId")
    }

    const adminExist = await Admin.findById(adminId);

    if(!adminExist){
        throw new Error("Admin does not exist")
    }

    // Grabbing the product ID and finding the product to get public_id of the image of product

    const findProduct = await product.findById(prodId);
    console.log(findProduct);

    const public_id = findProduct.publicId;

    // Deleting the product image from cloudinary by calling predefined method 

    const deleteProductImgs = await cloudFileDelete(public_id)
    console.log("Deleted images are", deleteProductImgs);
    
    const productDeleted = await product.findByIdAndDelete(prodId)

    res.status(202).json({
        success: true,
        message: "Product deleted successfully :)",
        productDeleted,
        deleteProductImgs
    })
}

catch(err){
    res.status(402).json({
        success: false,
        message: err.message
    })

}

}

exports.searchProduct = async (req, res) => {

    try{
        const {search} = req.body;

        console.log("req. body",search);
        const regex = new RegExp(search, 'i')

        const searchProduct = await product.find({$or:[{name: {$in: [regex]}} , {brand: {$in: [regex]}}]})
        
        console.log("search product", searchProduct);

        const filteredProd = await searchProduct.filter(product)

        console.log("product Filtered" + filteredProd );

        if(filteredProd == " "){
            throw new Error("No product found")
        }

        res.status(202).json({
            success: true,
            message: "Here is the product you searched for",
            filteredProd
        })

    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

