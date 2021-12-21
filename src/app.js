const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const publicPath = path.join(__dirname, "../public");

const mainRouter = require("./routers/mainRouter");
const usersRouter = require('./routers/usersRouter')
const marketsRouter = require("./routers/marketsRouter");
//seteamos method-override aca y con un app.use debajo para poder usar PUT y DELETE
const methodOverride = require("method-override");

// seteamos ruta de archivos estaticos y view engine por defecto
app.use(express.static(publicPath));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// ejecutamos el servidor
app.listen(process.env.PORT || 3000, () => {
  console.log("El servidor se está ejecutando en el puerto 3000");
});

// middlewares
// nos permite capturar informacion que llega por post
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
// loguea los ingresos a cada pagina
app.use(logMiddleware);

app.use(
  session({
    secret: "UniFi",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(userLoggedMiddleware);
app.use(cookieParser());

// rutas
app.use("/", mainRouter);
app.use('/users', usersRouter)
app.use("/markets", marketsRouter);

// pagina para renderizar cuando se intenta entrar a una ruta inexistente
app.use((req, res, next) => {
  res.status(404).render("not-found");
});
