const { makeExecutableSchema } = require('graphql-tools');
const { graphqlHTTP } = require('express-graphql');

const initServices = require('./category.services');
const initResolvers = require('./category.resolvers');

const typeDefs = require('./category.typeDefs');

const IS_DEV = process.env.IS_DEV === 'true';

module.exports = async ({ api, SubCategoryServices }) => {
  const CategoryServices = await initServices();
  const CategoryResolvers = await initResolvers({ CategoryServices, SubCategoryServices });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: CategoryResolvers,
  });

  api.use(
    '/category',
    graphqlHTTP({
      schema,
      graphiql: IS_DEV,
    }),
  );

  return CategoryServices;
};
