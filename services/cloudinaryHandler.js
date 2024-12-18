const cloudinary = require("cloudinary");
// const cloudConfig = require("../config/v2config");

exports.cloudConfig = cloudinary.v2.config({
    cloud_name: process.env.V2_CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

})

exports.cloudFileUpload = async (localFilePath, res) => {

    try{

    if(!localFilePath){

        throw new Error("Could not get filePath")
    }

    // JSON.stringify(localFilePath)
    console.log("localfilepath is", localFilePath)
    // localFilePath = localFilePath.toString()

    // ;
    const fileUpload = await cloudinary.v2.uploader.upload(
        localFilePath,
        // resource_type: "auto"
        
    )

    console.log("file upload url",fileUpload.url);
    return fileUpload;
}

catch(err){
    // console.log(res.status);
   console.log(err);
}
}

exports.cloudFileUpdate = async (public_id, res) => {

    try{

        if(!public_id){
            throw new Error("Public ID of the image is required")
        }

        const fileUpdate = await cloudinary.v2.api.update(public_id, {
            background_removal: public_id,
            
        })

    }

    catch{

    }
}

exports.cloudFileDelete = async (public_id, res) => {

    try{

        if(!public_id){

            throw new Error("Sorry we could not get the public ID")
        }

        // How to grab the public id of the image that i want delete from cloudinary

        const fileDelete = await cloudinary.v2.uploader.destroy(public_id, {
            resource_type: "image"
        })

        // destroy() method is used to delete a single image from cloudinary
        // To delete multiple images use delete_resources([publicIds], options) => cloudinary.v2.api.delete_resources()

        console.log("The file deleted from cloudinary is", fileDelete);

        return fileDelete;

    }

    catch(err){

        res.status(400).json({
            success: false,
            message: err.message
        })



    }
}