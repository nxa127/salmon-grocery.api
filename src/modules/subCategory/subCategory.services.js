const SubCategory = require('./subCategory.model');

module.exports = () => ({
  createSubCategory: async ({ name = '', categoryId }) => {
    try {
      await SubCategory.create({
        name,
        categoryId
      })

      return true
    } catch (err) {
      console.log('Create subCategory failed:', err.reason)
      return false
    }
  },
  updateSubCategory: async ({ name, categoryId }) => {
    try {
      const subCategory = await SubCategory.findOne({ name });

      if (!subCategory) {
        throw new Error('subCategory not found')
      }

      await subCategory.update({
        name,
        categoryId
      })

      return true
    } catch (err) {
      console.log('Update subCategory failed:', err.reason);
      return false
    }
  }
})