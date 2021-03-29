const Category = require('./category.model');
const SubCategory = require('../subCategory/subCategory.model');

const Promise = require('bluebird');

module.exports = () => ({
  getCategories: async () => {
    const categories = await Category.find().sort({
      createAt: -1
    })

    return categories
  },
  getCategory: async (categoryId) => {
    const category = await Category.findOne({ _id: categoryId })

    if (!category) {
      throw new Error('Category not found')
    }

    return category
  },
  createCategory: async ({ name = '', subCategories = [] }) => {
    try {
      const _category = await Category.create({ name })

      await Promise.map(subCategories, async subCategory => {
        const _subCategory = await SubCategory.findOne({ name: subCategory });

        if (!_subCategory) {
          await SubCategory.create({
            name: subCategory,
            categoryId: _category._id
          })
        }        
      })

      return true

    } catch (err) {
      console.log('Create category failed:', err.reason)
      return false
    }
  }
})