const Product = require('./product.model');

module.exports = () => ({
  getProducts: async () => {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    return products;
  },
  getProduct: async productId => {
    try {
      const product = await Product.find({
        _id: productId,
      });

      return product;
    } catch (err) {
      return err;
    }
  },
  createProduct: async ({
    category,
    subCategory,
    productName,
    material = '',
    size = '',
    color = '',
    sex = '',
    price,
    sale = 0,
    images = [],
    inStock = 0,
    onSales = false,
  }) => {
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
        onSales,
      });

      return true;
    } catch (err) {
      console.log('Create product failed:', err);

      return false;
    }
  },
  updateProduct: async ({
    productId,
    category,
    subCategory,
    productName,
    material = '',
    size = '',
    color = '',
    sex = '',
    price,
    sale = 0,
    images = [],
    inStock = 0,
    onSales = false,
  }) => {
    try {
      const product = await Product.findOne({ _id: productId });
      if (!product) {
        throw new Error('Product not found');
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
        onSales,
      });

      return true;
    } catch (err) {
      console.log('Update product failed:', err);

      return false;
    }
  },
});
