const mongoose = require("mongoose");

require("dotenv").config();

const connectToDatabase = () => {
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((conn)=>{
        console.log(conn.connect,"Connected to DataBase");
    })
    .catch((err)=>{
        console.log(err.message)
        process.exit(1);
    })
;
}

module.exports = connectToDatabase;