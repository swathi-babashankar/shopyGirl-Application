const Mongoose = require("mongoose");
const product = require("../model/tshirtSchema");
const formidable = require("formidable");
const fs = require("fs");
const config = require("../config/index.js");
// const Aggregate = require("mongoose")
const {s3DeleteFile, s3FileUpload} = require("../services/imageHandler.js");

exports.createProduct = async (req, res) => {

    const form = formidable({
        multiples: true,
        keepExtensions: true
    })

    form.parse(req, async function(err, fields, files){
    
        try{

            if(err){
                throw new Error("Something Went Wrong :(")
            }

            let productId = new Mongoose.Types.ObjectId().toHexString();
            console.log(fields, files);

            if(!fields.name || !fields.brand || !fields.category || !fields.price || !fields.discount){
                throw new Error("Please fill necessary fields about the product")
            }

            let imgArrResp = Promise.all(
                // to make sure the images coming are array
                Object.keys(files).map( async (filekey, index) => {
                    const elements = files[filekey];

                    let data = fs.readFileSync(elements.filepath)

                    const imgUpload = await s3FileUpload({
                        bucketName: config.S3_BUCKET_NAME,
                        key: `product/${productId}/photos_${index + 1}.png`,
                        body: data,
                        contentType: elements.mimetype
                    })

                    return{
                        secure_url: imgUpload.Location
                    }

             })       
            );
    
            let imgArray = await imgArrResp;
            const productCreated = await product.create({
                _id: productId,
                images: imgArray,
                ...fields
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
   
    )
    
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

        const {prodId} = req.params;
        const getProdById = await product.findById(prodId)

        if(getProdById){
            res.status(202).json({
                success: true,
                message: "Products fetched successfully using productID",
                getProdById
            })
        }

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

        const {name, brand, category, price, discount} = req.body;
        const {prodId} = req.params;

        // how to ask user which field he want to update
        // what if we want to update image with formidable and remove old images
        if(!name || !brand || !category || !price || discount){
            throw new Error("Please fill necessary fields")
        }

        const productUpdated = await product.findByIdAndUpdate(prodId, {name, brand,
            category, price, discount
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

    try{

    const {brand, price, discount} = req.body;

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

    try{

    const {prodId} = req.params;
    const {img} = req.params.filename;
    
    if(!prodId){
        throw new Error("Sorry Product ID not found")
    }
    
    const imgDelete = await s3DeleteFile({
        bucketName: config.S3_BUCKET_NAME,
        key: `product/${prodId}/${img}.png`,
    })

    
    const productDeleted = await product.findByIdAndDelete({prodId})

    res.status(202).json({
        success: true,
        message: "Product deleted successfully :)",
        productDeleted,
        imgDelete
    })
}

catch(err){
    res.status(402).json({
        success: false,
        message: err.message
    })

}

}

exports.searchProduct = async(req, res) => {

    try{
        const {search} = req.body;

        const searchProduct = await product.find({$or: {name: new RegExp(search, 'i')} ,$or: {brand: new RegExp(search, 'i')}})
        // const searchpro = await product.aggregate({$search: {name: regexp(search, 'i')}})
        console.log(searchProduct);

        const filteredProd = searchProduct.filter(product)
        console.log(filteredProd + "product Filtered");


        res.status(202).json({
            success: true,
            message: "Here is the product you searched for",
            filteredProd
        })//

    }

    catch(err){

        res.status(404).json({
            success: true,
            message: err.message
        })
    }
}

