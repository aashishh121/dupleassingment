const express = require("express");
require("./db/config");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const mediaRoutes = require("./routes/media");
const router = require("./routes/user-routes");

app.use("/api/v1/media", mediaRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api",router);


const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
    const path = require("path");
    app.get("*",(req,resp)=>{
        resp.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}

app.listen(PORT);