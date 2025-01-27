const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  stylecode:{
    type:String,
    required:true
  },
  image: [{ type: String }], // Array of image URLs
  description: { 
    type: String, 
    required: true 
  },
  brand: {
    name: { type: String, required: true }
  },
  price: { 
    type: Number, 
    required: true 
  },
  material: { 
    type: String, 
    required: true 
  },
  pattern: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  fabricCare: { 
    type: String, 
    required: true 
  },
  lengthType: { 
    type: String, 
    required: true 
  },
  neck: { 
    type: String, 
    required: true 
  },
  stock:{
    type:Number,
    required:true
  },
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt fields

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
