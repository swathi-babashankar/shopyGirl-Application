require("dotenv").config();
const app = require("./api/index.js");
const serverless = require("serverless-http");
const PORT = process.env.PORT|| 4000;
module.exports.handler = serverless(app);

// app.listen(PORT, ()=>{
//     console.log(`App is running at http://localhost:${PORT}`);
// })
// ;
// module.exports = app;

