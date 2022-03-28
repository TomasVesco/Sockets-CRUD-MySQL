const express = require('express');
const moment = require('moment');

const ContenedorProducts = require('./claseProducts');
const ContenedorMensajes = require('./claseMensajes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

const p = new ContenedorProducts( './productos.txt' );
const m = new ContenedorMensajes( './mensajes.txt' );

app.get('/productos', async (req, res) => {
    let product = await p.getAll();
    res.render('index', { product } );
});

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});

io.on("connection", async function (socket) {

  let products = await p.getAll();
  let messages = await m.getAll();

  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);
  socket.emit("products", products);

  socket.on("new-message", async (data) => {
    let date = moment(new Date()).format('DD-MM-YYYY h:mm:ss a');
    messages = await m.save({...data, date: date});
    io.sockets.emit("messages", messages);
  });

  socket.on("new-product", async (data) => {
    products = await p.save(data);
    io.sockets.emit("products", products);
  });
});

app.use(express.static("views"));