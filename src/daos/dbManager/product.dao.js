import { productModel } from "../../models/product.model.js";

class ProductDao {
    async getAllProducts(limit = 10, page = 1, query, sort) {
        let consulta = {}
        if (query != undefined) {
            consulta[query.split(":")[0]] = query.split(":")[1]
        }
        return await productModel.paginate(consulta, { limit: limit, page: page, sort: sort == undefined ? {} : { price: Number(sort) } })

    }mongo

    async getProductById(_id) {
        return await productModel.findById({ _id })
    }

    async createProduct(product) {
        return await productModel.create(product)
    }

    async updateProduct(_id, product) {
        return await productModel.findByIdAndUpdate({ _id }, product)
    }

    async deleteProduct(_id) {
        return await productModel.findByIdAndDelete({ _id })
    }
}

export default new ProductDao