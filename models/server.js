//servidor de express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
   constructor() {
      this.app = express();
      this.port = process.env.PORT;

      //http server
      this.server = require("http").createServer(this.app);

      //Configuracion socket
      this.io = socketio(this.server, {
         /*configuaraciones*/
      });
   }

   middleware() {
      //despleagar el dictorio publico
      this.app.use(express.static(path.resolve(__dirname, "../public")));
   }

   configurarSockets() {
      new Sockets(this.io);
   }

   execute() {
      //Inicialiar middleware
      this.middleware();

      // Inicializar sockets
      this.configurarSockets();

      //Inicilizar server
      this.server.listen(this.port, () => {
         console.log("Server corriendo en puerto: ", this.port);
      });
   }
}

module.exports = Server;
