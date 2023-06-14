/*Arquivo que vai reunir todos os grupos de rotas*/

const { Router } = require("express");
const routes = Router();

// Rota do usuário
const usersRouter = require("./users.routes");
routes.use("/users", usersRouter)



//exportando para ser usado no no server.js
module.exports = routes;