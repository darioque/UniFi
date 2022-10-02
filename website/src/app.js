const express = require("express");
const path = require("path");
const app = express();
const moment = require("moment");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const publicPath = path.join(__dirname, "../public");
const userLoggedMiddleware = require("./middlewares/UserLoggedMiddleware");
const mainRouter = require("./routers/mainRouter");
const usersRouter = require("./routers/usersRouter");
const marketsRouter = require("./routers/marketsRouter");
const apiRouter = require('./routers/apiRouter')
//seteamos method-override aca y con un app.use debajo para poder usar PUT y DELETE
const methodOverride = require("method-override");

app.use(cors({
    origin: '*',
}))
// seteamos ruta de archivos estaticos y view engine por defecto
app.use(express.static(publicPath));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// middlewares
// nos permite capturar informacion que llega por post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
});

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
app.use("/users", usersRouter);
app.use("/markets", marketsRouter);
app.use('/api', apiRouter)

// pagina para renderizar cuando se intenta entrar a una ruta inexistente
app.use((req, res, next) => {
    res.status(404).render("not-found");
});

// ejecutamos el servidor
app.listen(process.env.PORT || 3001, () => {
    console.log("Server is online");
});
