const Category = require('./category.model');
const SubCategory = require('../subCategory/subCategory.model');

const Promise = require('bluebird');

module.exports = () => ({
  getCategories: async () => {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    return categories;
  },
  getCategory: async categoryId => {
    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  },
  create: async ({ name = '', subCategories = [] }) => {
    try {
      const _category = await Category.create({ name });

      await Promise.map(subCategories, async subCategory => {
        const _subCategory = await SubCategory.findOne({ name: subCategory });

        if (!_subCategory) {
          await SubCategory.create({
            name: subCategory,
            categoryId: _category._id,
          });
        }
      });

      return true;
    } catch (err) {
      console.log('Create category failed:', err);
      return false;
    }
  },
  update: async ({ categoryId, name, subCategories = [] }) => {
    try {
      const _category = await Category.findById(categoryId);

      if (!_category) {
        throw new Error('Category not found');
      }

      const _subCategories = await SubCategory.find({ categoryId });

      await Promise.map(_subCategories, async subCategory => {
        const _subCategory = await SubCategory.findOne({ name: subCategory.name });
        if (_subCategory) {
          await _subCategory.update({
            categoryId: '',
          });
        }
      });

      await Promise.map(subCategories, async subCategory => {
        const _subCategory = await SubCategory.findOne({ name: subCategory });

        if (!_subCategory) {
          await SubCategory.create({
            name: subCategory,
            categoryId: categoryId,
          });
        } else {
          await _subCategory.update({
            categoryId,
          });
        }
      });

      await _category.update({
        name,
      });

      return true;
    } catch (err) {
      console.log('Update Category failed:', err);
      return false;
    }
  },
});
