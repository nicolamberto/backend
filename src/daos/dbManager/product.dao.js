import { productModel } from "../../models/product.model.js";

class ProductDao {
    async getAllProducts(){
        return await productModel.find()
    }

    async getProductById(_id){
        return await productModel.findById({_id})
    }

    async createProduct(product){
        return await productModel.create(product)
    }

    async updateProduct(_id, product){
        return await productModel.findByIdAndUpdate({_id}, product)
    }

    async deleteProduct(_id){
        return await productModel.findByIdAndDelete({_id})
    }
}

export default new ProductDao