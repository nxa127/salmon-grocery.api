module.exports = async ({ SubCategoryServices }) => ({
  Query: {},
  Mutation: {
    create: (_, { name, categoryId }) => SubCategoryServices.create({ name, categoryId }),
    update: (_, { name, categoryId }) => SubCategoryServices.update({ name, categoryId }),
  },
  SubCategory: {
    id: subCategory => subCategory._id,
  },
});
