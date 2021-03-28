const Product = require("./product.model");

module.exports = () => ({
  getProducts: () => {
    const products = Product.find().sort({
      createdAt: -1
    })

    return products;
  },
  getProduct: (productId) => {
    try {
      const product = Product.find({
        _id: productId
      })

      return product
    } catch (err) {
      return err
    }
  },
  createProduct: ({ category, subCategory, productName, material = '', size = '', color = '', sex = '', price, sale = 0, images = [], inStock = 0, onSales = false }) => {
    try {
      await Product.create({
        category,
        subCategory,
        productName,
        material,
        size,
        color,
        sex,
        price,
        sale,
        images,
        inStock,
        onSales
      })

      return true
    } catch (err) {
      console.log("Create product failed:", err.reason)

      return false
    }
  },
  updateProduct: ({ productId, category, subCategory, productName, material = '', size = '', color = '', sex = '', price, sale = 0, images = [], inStock = 0, onSales = false }) => {
    try {
      const product = Product.findOne({ _id: productId });
      if (!product) {
        throw new Error('Product not found')
      }

      await product.update({
        category,
        subCategory,
        productName,
        material,
        size,
        color,
        sex,
        price,
        sale,
        images,
        inStock,
        onSales
      })

      return true
    } catch (err) {
      console.log("Update product failed:", err.reason)

      return false
    }
  },
})