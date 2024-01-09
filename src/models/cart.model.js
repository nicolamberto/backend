import { Schema, model, mongoose } from "mongoose";


const cartSchema = new Schema({
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number, required: true, default: 1 },
    }],
});
/*     cartSchema.pre("find", function() {
        this.populate('products')
    }) */
const cartModel = model('carts', cartSchema)

export { cartModel }