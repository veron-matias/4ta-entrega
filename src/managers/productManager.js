import {promises as fs} from 'fs';
import {v4 as uuidv4} from 'uuid';


export class ProductManager {

    constructor (){
        this.path='products.json'
        this.products = [];
    }

    addProduct = async ( {title, description, price, thumbail, code, stock, status,  category} ) => {
        //guardamos el ID en una constante
        const id =  uuidv4(); 

        let newProduct = {id,title, description, price, thumbail, code, stock, status,  category}
        this.products = await this.getProducts();
        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products))
        return newProduct;
    }
    // mostrar todos los productos f= OK 
    getProducts = async ()=> {
        const response = await fs.readFile(this.path, 'utf-8')
        const responseJSON = JSON.parse(response)
        return responseJSON;
        }

    getProductById = async (id) => {
        const response = await this.getProducts()
        const product =    response.find(product =>product.id == id)
            if(product){
                return product;
                } else {
                console.log (`Producto ( ${product.id})no encontrado `)
            }
        }
    
    updateProduct = async (id,  { ... data}) => {
        const products = await  this.getProducts()
        const index = products.findIndex(product=>product.id == id)
        if (index != -1 ) {
            products[index] = {id,...data}
            await fs.writeFile (this.path, JSON.stringify(products))
            return products[index]
        }else {
            console.log ("Producto no encontrado")
        }
    }

    deleteProduct = async (id ) => { 
        const products = await this.getProducts()
        const index =  products.findIndex(product => product.id == id)

        if( index != -1 ) {
            products.splice (index, 1 )
            await fs.writeFile(this.path, JSON.stringify(products))

        }else {
            console.log ("producto no encontrado");
        }
    }
}