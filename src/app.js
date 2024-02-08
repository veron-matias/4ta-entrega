import express from 'express'
import {ProductManager} from './managers/productManager.js'
import productsRouter from './routes/products.router.js';
import { CartManager } from './managers/cartManager.js';
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from ("./routes/views.router.js"); 

const exphbs = require("express-handlebars");
const socket = require("socket.io");

const PORT = 8080;
const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));


//RUTAS 
app.use('/api/products/', productsRouter)  //localhost:8080/api/products
app.use('/api/carts/', cartsRouter)   //http://localhost:8080/api/carts/
app.use("/", viewsRouter);

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


// Corriendo en puerto 8080
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const ProductManager = require("./managers/productManager.js");
const productManager = new ProductManager("../products.json");

const io = socket(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se conecto");

    
    socket.emit("productos", await productManager.getProducts()); //Enviamos el array de productos al cliente que se conectó. 

    
    socket.on("eliminarProducto",  async (id) => { //Recibimos el evento "eliminarProducto" desde el cliente: 
        await productManager.deleteProduct(id);
        io.sockets.emit("productos", await productManager.getProducts()); // se envia la lista actualizada al cliente

    })
    socket.on("agregarProducto", async (producto) => {
        console.log(producto);
        await productManager.addProduct(producto);
        io.sockets.emit("productos", await productManager.getProducts());
    })
    
})