// middleware nivel ruta
const fs = require("fs");
function logDBMiddleware(req, res, next) {
    fs.appendFileSync("logDB.txt", "\nSe creó un registro al ingresar en " + req.url);
    next();
}
module.exports = logDBMiddleware;
