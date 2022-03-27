const express = require('express');
const moment = require('moment');
const Contenedor = require('./clase');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

const p = new Contenedor( './productos.txt' );

app.get('/productos', async (req, res) => {
    const product = await p.getAll();
    res.render('index', { product } );
});

app.post('/productos', async (req, res) => {
    let product = await p.getAll();

    const { title, price, image } = req.body;

    const newProduct = {
        title: title,
        price: price,
        image: image
    }

    await p.save(newProduct);

    product = await p.getAll();
    res.render('index', { product });  
});

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});

const messages = [];

io.on("connection", async function (socket) {

  let products = await p.getAll();

  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);
  socket.emit("products", products);

  socket.on("new-message", (data) => {
    let date = moment(new Date()).format('DD-MM-YYYY h:mm:ss a');
    messages.push({...data, date: date});
    io.sockets.emit("messages", messages);
  });

  socket.on("new-product", (data) => {
    products.push(data);
    io.sockets.emit("products", products);
  });
});

app.use(express.static("views"));