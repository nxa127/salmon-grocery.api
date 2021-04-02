module.exports = async ({ CategoryServices, SubCategoryServices }) => ({
  Query: {
    getCategories: (_, {}) => CategoryServices.getCategories(),
    getCategory: (_, { id }) => CategoryServices.getCategory(id),
  },
  Mutation: {
    create: (_, { name, subCategories }) => CategoryServices.create({ name, subCategories }),
    update: (_, { categoryId, name, subCategories }) =>
      CategoryServices.update({ categoryId, name, subCategories }),
  },
  Category: {
    id: category => category._id,
    subCategories: category => SubCategoryServices.getSubCategories(category._id),
  },
});
