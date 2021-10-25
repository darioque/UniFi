const express = require("express");
const path = require("path");

const app = express();

const publicPath = path.join(__dirname, "./public");

// publicPath es nuestro recurso de archivos estaticos
app.use(express.static(publicPath));

// ejecutamos el servidor
app.listen(3000, () => {
    console.log("El servidor se está ejecutando en el puerto 3000");
});

// responde al request "get" a root con index.html
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "/views/productDetail.html"));
});