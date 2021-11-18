const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "../public");

const mainRouter = require('./routers/mainRouter.js');
const marketsRouter = require('./routers/marketsRouter.js')

// seteamos ruta de archivos estaticos y view engine por defecto
app.use(express.static(publicPath));
app.set('view engine', 'ejs')

// ejecutamos el servidor
app.listen(process.env.PORT || 3000, () => {
  console.log("El servidor se está ejecutando en el puerto 3000");
});

// rutas
app.use('/', mainRouter);
app.use('/markets', marketsRouter)


app.get("/trade-confirmation", (req, res) => {
  res.render("tradeConfirmation");
});


