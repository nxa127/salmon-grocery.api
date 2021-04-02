const SubCategory = require('./subCategory.model');
const Category = require('../category/category.model');

module.exports = () => ({
  getSubCategories: async categoryId => {
    const subCategories = await SubCategory.find({ categoryId }).sort({
      createdAt: -1,
    });

    return subCategories;
  },

  create: async ({ name, categoryId }) => {
    try {
      const category = await Category.findById(categoryId);

      if (!category) {
        throw new Error('Category not found');
      }

      await SubCategory.create({
        name,
        categoryId,
      });

      return true;
    } catch (err) {
      console.log('Create subCategory failed:', err);
      return false;
    }
  },

  update: async ({ name, categoryId }) => {
    try {
      const subCategory = await SubCategory.findOne({ name });

      if (!subCategory) {
        throw new Error('subCategory not found');
      }

      await subCategory.update({
        name,
        categoryId,
      });

      return true;
    } catch (err) {
      console.log('Update subCategory failed:', err);
      return false;
    }
  },
});
