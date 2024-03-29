const express = require("express");
const router = express.Router(); 

const ProductManager = require("../managers/productManager.js");
const productManager = new ProductManager("../../products.json");


router.get("/", async (req, res) => {
    try {
        const productos = await productManager.getProducts();

        res.render("home", {productos: productos})
    } catch (error) {
        console.log("error al obtener los productos", error);
        res.status(500).json({error: "Error interno del servidor"});
    }
})

//(2)

router.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realtimeproducts");
    } catch (error) {
        console.log("error en la vista real time", error);
        res.status(500).json({error: "Error interno del servidor"});
    }
})



module.exports = router; 