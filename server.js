require("dotenv").config();
const app = require("./api/index.js");
const PORT = process.env.PORT|| 4000;

app.listen(PORT, ()=>{
    console.log(`App is running at http://localhost:${PORT}`);
})
;
