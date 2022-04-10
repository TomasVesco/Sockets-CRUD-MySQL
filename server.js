const express = require('express');
const moment = require('moment');

const ContenedorProducts = require('./clases/claseProducts');
const ContenedorMensajes = require('./clases/claseMensajes');

const p = new ContenedorProducts();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

app.set('views', './views');
app.set('view engine', 'ejs');

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 8080;

httpServer.listen(PORT, function () {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



// ---------------------> FIN DECLARACIONES <---------------------



app.get('/productos', async (req, res) => {

  await p.save();

  res.status(200).render('index');
});


// io.on("connection", async function (socket) {

//   products = await p.getAll();
//   messages = await m.getAll();

//   socket.emit("products", products);
//   socket.emit("messages", messages);

//   socket.on("new-product", async (data) => {

//     if(data.title !== '' & data.price !== '' && data.image !== ''){
//       products = await p.save(data);
//     }

//     io.sockets.emit("products", products);
//   });

//   socket.on("new-message", async (data) => {

//     let date = moment(new Date()).format('DD-MM-YYYY h:mm:ss a');

//     if(data.author !== '' && data.text !== ''){
//       messages = await m.save({...data, date: date});
//     }

//     io.sockets.emit("messages", messages);
//   });
// });