const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "../public");

const mainRouter = require("./routers/mainRouter.js");
const marketsRouter = require("./routers/marketsRouter.js");
//seteamos method-override aca y con un app.use para poder usar PUT y DELETE
const methodOverride = require("method-override");

// seteamos ruta de archivos estaticos y view engine por defecto
app.use(express.static(publicPath));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// ejecutamos el servidor
app.listen(process.env.PORT || 3000, () => {
  console.log("El servidor se está ejecutando en el puerto 3000");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

// rutas
app.use("/", mainRouter);
app.use("/markets", marketsRouter);

//ruta que renderiza página de not-found cada vez que no encuentra una ruta
app.use((req, res, next) => {
  res.status(404).render("not-found");
});
