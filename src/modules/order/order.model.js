const mongoose = require('mongoose');

const Order = new mongoose.Schema(
  {
    buyer: { type: mongoose.Types.ObjectId, require: true },
    status: { type: String, require: true, default: 'created' },
    confirmedAt: { type: String, default: '' },
    shippedAt: { type: String, default: '' },
    canceledAt: { type: String, default: '' },
    cart: {
      type: {
        products: { type: [mongoose.Schema.Types.Mixed], require: true },
        total: { type: Number, min: 0, require: true },
      },
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Order', Order);
