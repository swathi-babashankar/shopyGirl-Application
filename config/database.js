const mongoose = require("mongoose");

require("dotenv").config();

const connectToDatabase = async () => {
  await  mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((conn)=>{
        console.log(`mongodb connected: ${conn.connection.host}`);
    })
    .catch((err)=>{
        console.log("mongodb connection error",err.message)
        throw err;
    })
;
}

module.exports = connectToDatabase;
