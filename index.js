const fs = require('fs')
class ProductManager {
    constructor() {
        this.products = []
        this.path = './products/products.json'
    }

    async addProducts(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.#generarId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        try {
            if (title && description && price && thumbnail && code && stock) {
                const validCode = this.#validarCode(code)
                if (validCode) {
                    return 'Código de producto repetido'
                } else {
                    this.products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                }
            }
            else {
                return 'Debe completar todos los campos'
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    #generarId() {
        return this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
    }

    #validarCode(code) {
        return this.products.find(prod => prod.code === code)
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const readProducts = await fs.promises.readFile(this.path, 'utf-8')
                const productsParse = JSON.parse(readProducts)
                return productsParse
            } else {
                return []
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductById(id) {

        try {
            const productsJSON = await fs.promises.readFile(this.path, 'utf-8')
            const productsParse = await JSON.parse(productsJSON)
            const productFound = await productsParse.find(product => product.id === id)
            if (productFound) {
                return productFound
            }
            else {
                return 'Not Found'
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProduct(id, change) {
        try {
            let arrayProducts = await fs.promises.readFile(this.path, 'utf-8')
            arrayProducts = JSON.parse(arrayProducts)
            let modifiedProduct = await this.getProductById(id)
            if (modifiedProduct) {
                modifiedProduct = { ...modifiedProduct, ...change }
                arrayProducts = arrayProducts.map(product => {
                    if (product.id === modifiedProduct.id) {
                        product = modifiedProduct
                    }
                    return product
                })
                arrayProducts = JSON.stringify(arrayProducts)
                await fs.promises.writeFile(this.path, arrayProducts)
                return arrayProducts
            } else {
                return null
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProduct(id) {
        try {
            const productsJSON = await fs.promises.readFile(this.path, 'utf-8')
            const productsParse = JSON.parse(productsJSON)
            const deletedProduct = await this.getProductById(id)
            if (deletedProduct) {
                const newArray = productsParse.filter(prod => prod.id != id)
                await fs.promises.writeFile(this.path, JSON.stringify(newArray))
                return newArray
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

const newProduct = new ProductManager()
const loadProducts = async () => {

    //Carga de productos
    await newProduct.addProducts('Bicicleta Venzo Skyline', 'MTB, Aluminio, Rodado 29', '$116.000', 'https://www.google.com/aclk?sa=l&ai=DChcSEwiM_eKTtY38AhXVFdQBHSpND-AYABABGgJvYQ&sig=AOD64_2TDCySw_fwrVlrDynp0qrHv_hRsw&adurl&ctype=5&ved=2ahUKEwir5dSTtY38AhUUr5UCHeySDTYQvhd6BAgBEG4', 'MTB01', 10)
    await newProduct.addProducts('Bicicleta Orbea Alma', 'MTB, Carbono, Rodado 29', '$1.600.000', 'https://www.google.com/aclk?sa=l&ai=DChcSEwiOxYXttY38AhUqKUwKHXwcCIsYABAPGgJvYQ&sig=AOD64_1TBtGTabWmZzmFrZO28-0oDON1EQ&adurl&ctype=5&ved=2ahUKEwib2vjstY38AhWxsJUCHfDDCNUQvhd6BAgBEHE', 'MTB02', 5)
    await newProduct.addProducts('Bicicleta Venzo Phoenix', 'Ruta, Aluminio, Rodado 28', '$185.000', 'https://www.google.com/aclk?sa=l&ai=DChcSEwiQx_7dto38AhUHFdQBHSlYBZcYABABGgJvYQ&sig=AOD64_12PEW-NkhsjSvvnc45ValDXPHghg&adurl&ctype=5&ved=2ahUKEwjUq-7dto38AhVCOrkGHRySCQEQvhd6BAgBEG4', 'RUT01', 7)

    //No permite carga de productos con codigo repetido
    // console.log(await newProduct.addProducts('Bicicleta Venzo Etna', 'Ruta, Carbono, Rodado 29', '$425.000', 'https://www.google.com/aclk?sa=l&ai=DChcSEwiQx_7dto38AhUHFdQBHSlYBZcYABABGgJvYQ&sig=AOD64_12PEW-NkhsjSvvnc45ValDXPHghg&adurl&ctype=5&ved=2ahUKEwjUq-7dto38AhVCOrkGHRySCQEQvhd6BAgBEG4', 'RUT01', 7))

    //No permite carga de productos con datos incompletos
    // console.log(await newProduct.addProducts('Bicicleta Venzo Raptor', 'Ruta, Aluminio, Rodado 29', '$195.000','RUT02', 7))

    //Obtener todos los productos
    console.log(await newProduct.getProducts())

    //Obtener un producto por ID
    // console.log(await newProduct.getProductById(2))
    // console.log(await newProduct.getProductById(4))

    // Modificar un producto ingresando ID y el campo a modificar
    // console.log(JSON.parse(await newProduct.updateProduct(1, { 'price': '$128.000' })))
    // console.log(JSON.parse(await newProduct.updateProduct(2, { 'stock': 2 })))

    //Eliminar un productos por ID
    // console.log(await newProduct.deleteProduct(3))
}
loadProducts()



