module.exports = async ({ SubCategoryService }) => ({
  Query: {},
  Muation: {
    create: (_, { name, categoryId }) => SubCategoryService.create({ name, categoryId }),
    update: (_, { name, categoryId }) => SubCategoryService.update({ name, categoryId }),
  },
  SubCategory: {
    id: subCategory => subCategory._id,
  },
});
