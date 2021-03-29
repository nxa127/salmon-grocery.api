const mongoose = require('mongoose');

const SubCategory = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  productId: { type: mongoose.Types.ObjectId, require: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('SubCategory', SubCategory)