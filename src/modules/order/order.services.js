const Order = require('./order.model');

module.exports = () => ({
  getUserOrders: async userId => {
    const orders = await Order.find({ buyer: userId }).sort({
      createdAt: -1,
    });

    return orders;
  },

  getOrder: async ({ userId, orderId }) => {
    const order = await Order.findOne({
      buyer: userId,
      _id: orderId,
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  },

  createOrder: async ({ buyer, products = [] }) => {
    if (!products.length) {
      throw new Error("Cart can't empty");
    }

    try {
      let total = 0;

      products.forEach(product => {
        const { price, sales, quantity } = product;

        const _price = price - (price * sales) / 100;

        total = total + _price * quantity;
      });

      const cart = {
        total,
        products,
      };

      await Order.create({
        buyer,
        cart,
      });
      return true;
    } catch (err) {
      console.log('Create order failed:', err);
      return false;
    }
  },

  updateOrderStatus: async ({ orderId, status }) => {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    if (!['created', 'confirmed', 'shipped', 'canceled'].includes(status)) {
      throw new Error('Order status is invalid');
    }

    if (order.status === 'canceled') {
      throw new Error('Order is canceled');
    }

    if (order.status === 'shipped') {
      throw new Error('Order is shipped');
    }

    try {
      let confirmedAt = '';
      let shippedAt = '';
      let canceledAt = '';

      switch (status) {
        case 'confirmed':
          confirmedAt = new Date(Date.now()).getTime();
          break;
        case 'shipped':
          shippedAt = new Date(Date.now()).getTime();
          break;
        case 'canceled':
          canceledAt = new Date(Date.now()).getTime();
          break;
        default:
          break;
      }
      order.update({
        status,
        confirmedAt,
        shippedAt,
        canceledAt,
      });
    } catch (err) {
      console.log('Update order status failed:', err);
      return false;
    }
  },
});
