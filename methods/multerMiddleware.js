const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // image is not showing in tmp folder after upload in cloudinary
        cb(null, "/backend/tmp")
    },

    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

exports.upload = multer({
    storage

})


