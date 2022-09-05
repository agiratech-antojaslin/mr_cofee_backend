const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  category_id: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  },
  status: {
    required: true,
    type: Boolean
  }
})

module.exports = mongoose.model('product', productSchema)