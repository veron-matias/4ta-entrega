import { Router } from 'express'
import { productManager } from '../app.js'
const productsRouter = Router()


// LOCALHOST:8080/api/products?limit=1  FUNCIONANDO OK
productsRouter.get('/', async (req, res) => {
    const limit   = req.query.limit
    const products = await productManager.getProducts()

    if (limit) {
        const limitedProducts = products.slice(0, limit)
        res.status(206).json( limitedProducts )
    } else  {
        return res.status(200).json({ products: products })
    } 
})
    //mostrando producto por id EJ LOCALHOST:8080/api/products/1
    productsRouter.get('/:pid', async (req, res) => {
        const {pid} = req.params;
        try {
            const products= await productManager.getProductById(pid);
            res.json(products);

        }catch (error){
            console.log(error);
            res.send("error al recibir prod por ID")
        }

    })

    productsRouter.post ("/", async (req,res) => {
        try { 
            const {title,description,price, thumbail,code,category, stock,status = true,} = req.body
            const  response= await  productManager.addProduct({ title, description, price, thumbail, code, stock, status, category })
        res.json(response)
        }catch(error){
            console.log(error)
            res.send ("error en agregar prod") }
    }) 

    productsRouter.put ('/:pid', async (req,res) => {
        const {pid} =req.params;
        try {const {title,description,price, thumbail,code,category, stock,status = true,} = req.body
        const  response= await  productManager.updateProduct(pid,{ title, description, price, thumbail, code, stock, status, category })
        res.json(response)
        }catch(error){
            console.log(error)
            res.send (`error en editar prod : ${pid}`)

        }
    })

    productsRouter.delete ('/:pid', async (req,res) => {
        const {pid} = req.params;
        try {
            await productManager.deleteProduct(pid)
            res.send("PROD  ELIMINADO")

        }catch (error){
            console.log(error);
            res.send (`error  al eliminar prod : ${pid}`)
        }

    })




export default productsRouter