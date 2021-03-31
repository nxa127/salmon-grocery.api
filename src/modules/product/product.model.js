const mongoose = require('mongoose');

const Product = new mongoose.Schema(
  {
    productName: { type: String, require: true, unique: true },
    material: String,
    size: String,
    color: String,
    brand: String,
    sex: String,
    age: String,
    price: { type: Number, require: true },
    sale: Number,
    description: String,
    inStock: { type: Number, min: 0, default: 1 },
    images: Array[String],
    onSales: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Product', Product);
