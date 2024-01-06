import { Schema, model } from "mongoose";


const cartSchema = new mongoose.Schema({

 

    products: [{
    
     
    
    product: { type: mongoose.Schema.Types.ObjectId, ref: ‘Product’ },
    
     
    
    quantity: { type: Number, required: true, default: 1 },
    
     
    
    }],
    
     
    
    });