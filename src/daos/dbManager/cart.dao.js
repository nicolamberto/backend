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

    async updateCart(_id, cart){
        return await cartModel.findByIdAndUpdate({_id}, cart)
    }

    async deleteProduct(_pid){
        return await cartModel.findByIdAndDelete({_pid})
    }
}

export default new CartDao