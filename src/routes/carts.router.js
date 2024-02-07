import { Router } from 'express'
import { cartManager } from '../app.js';
const cartsRouter = Router();

//nuevo carrito http:/localhost:8080/api/carts/

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.newCart();
        res.status(200).json(newCart);
    } catch (error) {
        console.error('Error al crear carrito:', error);
        res.status(500).send('Error interno al crear carrito');
    }
});

    // obtener todos los carritos
cartsRouter.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).send('Error al obtener carritos');
    }
});

cartsRouter.get('/:cid', async (req,res)=>{
    const {cid}=req.params;
    try{ 
        const response= await cartManager.getCartProducts(cid)
        res.json(response)
    }catch(error){
        res.send("error al intentar enviar los prod del carrito")
        //res.send("Failed to send products to Cart")
    }
})

//agregar un prod al carrito
cartsRouter.post('/:cid/products/:pid', async function(req, res) {
    const { cid, pid } = req.params;
    try {
        await cartManager.addProductToCart(cid, pid);
        res.status(200).send("Producto agregado correctamente al carrito.");
    } catch (error) {
        console.error("Error al intentar guardar el producto en el carrito:", error);
        res.status(500).send("Ha ocurrido un error al intentar guardar el producto en el carrito.");
    }
});

export {cartsRouter}