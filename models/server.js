const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //CONECTAR DB
    this.conectarDB();

    //MIDDLEWARES
    this.middlewares();

    //RUTAS
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    //DIRECTORIO PUBLICO
    //USE es la clave de que se trata de un middleware
    this.app.use(cors());
    //LECTURA Y PARSEO DEL BODY
    this.app.use(express.json());
    //DIRECTORIO PÚBLICO
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.get("/peliculas/todas", (req, res) => {
      res.json({
        peliculas: "nolas",
      });
    });
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
