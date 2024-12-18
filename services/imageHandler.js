const s3 = require("../config/s3config.js");

exports.s3FileUpload = async({bucketName, key, body, contentType}) => {
    return await s3.upload({
        Bucket: bucketName,
        Key: key,
        Body: body,
        Content: contentType
    }).promise()
}

// exports.v2FileUpload = async({cloudName, key, body}) => {

//     return await cloudv2.uploader.upload({
//         cloudName: cloudName,
//         key: key,
//         body: body


//     })

// }

exports.s3DeleteFile = async(bucketName, key) => {
    return await s3.deleteObject({
        Bucket: bucketName,
        Key: key
    }).promise()
}