const fs = require("fs")

class ProductManager {
    constructor(fileName) {
      this.fileName = fileName;
      if (fs.existsSync(fileName)) {
        try {
          let products = fs.readFileSync(fileName, "utf-8");
          this.products = JSON.parse(products);
        } catch (error) {
          this.products = [];
        }
      } else {
        this.products = [];
      }
    }
  
    async saveFile(data) {
      try {
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(data, null, "\t")
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  
    async addProduct(product) {
      this.products.push(product);
  
      const respuesta = await this.saveFile(this.products);
  
      if (respuesta) {
        console.log("Usuario creado");
        console.log(this.products);
      } else {
        console.log("Hubo un error al crear un usuario");
      }
    }
  
    getProducts() {
      console.log(this.products);
      return this.products;
    }

    async deleteProduct(id) {
        const product = this.products.find((p) => p.id === id);
    
        if (!product) {
          return console.log("El post no existe");
        }
    
        const index = this.products.findIndex((p) => p.id === id);
    
        try {
          this.products.splice(index, 1);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(this.products, null, "\t")
          );
        } catch (error) {
          console.log("hubo un error");
          return;
        }
      }



  }






  class Product {
    constructor(id, title, description, price, thumbnail, code, stock) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  }

  const product1 = new Product(1, "celular", "celular", 200, "aaa", "ac2fr", 10)
  const product2 = new Product(2, "eeeee", "celular", 200, "dddd", "ac2fr", 11)
  const product3 = new Product(3, "qqqqq", "celular", 200, "sssss", "ac2fr", 12)
  
  
  const manager = new ProductManager("./Products.json");

  manager.addProduct(product1)