import { cartModel } from "../../models/cart.model.js"

class CartDao {
    async getCarts(){
        return await cartModel.find().populate('products.product')
    }

    async getCartById(_id){
        return await cartModel.findById({_id})
    }

    async createCart(cart){
        return await cartModel.create(cart)
    }

    async updateProduct(_id, product){
        return await cartModel.findByIdAndUpdate({_id}, product)
    }

    async deleteProduct(_cid, _pid){
        return await cartModel.findByIdAndDelete({_id, _pid})
    }
}

export default new CartDao