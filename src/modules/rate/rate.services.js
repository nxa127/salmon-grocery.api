const Rate = require('./rate.model');

module.exports = () => ({
  getUserRates: async (userId) => {
    const rates = await Rate.find({ userId });

    return rates;
  },
  getProductRates: async (productId) => {
    const rates = await Rate.find({ productId });

    return rates;
  },
  createRate: async ({ userId, productId, rate, comment }) => {
    try {
      await Rate.create({
        userId,
        productId,
        rate,
        comment
      })

      return true
    } catch (err) {
      console.log(`Create rate for product ${productId} from user ${userId} failed: ${err.reason}`)
      return false;
    }
  }
})