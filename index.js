class ProductManager {
    constructor() {
        this.products = []
    }

    addProducts(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.#generarId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if (title && description && price && thumbnail && code && stock) {

            const validCode = this.#validarCode(code)
            if (validCode) {
                console.warn('Código de producto repetido')
            } else {
                this.products.push(product)
            }
        }
        else {
            return console.warn('Debe completar todos los campos')
        }
    }

    #generarId() {
        return this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
    }

    #validarCode(code) {
        return this.products.find(prod => prod.code === code)
    }

    getProducts() {
        return console.log(this.products)
    }

    getProductById(id) {
        const productFound = this.products.find(product => product.id === id)
        productFound ? console.log(productFound) : console.warn('Not Found')
    }
}

const newProduct = new ProductManager()
newProduct.addProducts('Bicicleta Venzo Skyline', 'MTB, Aluminio, Rodado 29', '$116.000', 'https://www.google.com/aclk?sa=l&ai=DChcSEwiM_eKTtY38AhXVFdQBHSpND-AYABABGgJvYQ&sig=AOD64_2TDCySw_fwrVlrDynp0qrHv_hRsw&adurl&ctype=5&ved=2ahUKEwir5dSTtY38AhUUr5UCHeySDTYQvhd6BAgBEG4', 'MTB01', 10)
newProduct.addProducts('Bicicleta Orbea Alma', 'MTB, Carbono, Rodado 29', '$1.600.000', 'https://www.google.com/aclk?sa=l&ai=DChcSEwiOxYXttY38AhUqKUwKHXwcCIsYABAPGgJvYQ&sig=AOD64_1TBtGTabWmZzmFrZO28-0oDON1EQ&adurl&ctype=5&ved=2ahUKEwib2vjstY38AhWxsJUCHfDDCNUQvhd6BAgBEHE', 'MTB02', 5)
newProduct.addProducts('Bicicleta Profile Thomas', 'MTB, Carbono, Rodado 29', '$487.000', 'MTB03', 3)
newProduct.addProducts('Bicicleta Venzo Phoenix', 'Ruta, Aluminio, Rodado 28', '$185.000', 'https://www.google.com/aclk?sa=l&ai=DChcSEwiQx_7dto38AhUHFdQBHSlYBZcYABABGgJvYQ&sig=AOD64_12PEW-NkhsjSvvnc45ValDXPHghg&adurl&ctype=5&ved=2ahUKEwjUq-7dto38AhVCOrkGHRySCQEQvhd6BAgBEG4', 'RUT01', 7)
newProduct.addProducts('Bicicleta Specialized Tarmac', 'Ruta, Carbono, Rodado 28', '$1.068.000', 'https://d22fxaf9t8d39k.cloudfront.net/0a7201cafaa5e2066e7e77ee7c65ddca7c80a334442669d613bad11e195a389c70115.jpeg', 'RUT01', 3)
newProduct.getProducts()
newProduct.getProductById(5)
newProduct.getProductById(1)
