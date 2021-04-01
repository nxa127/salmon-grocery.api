const { makeExecutableSchema } = require('graphql-tools');
const { graphqlHTTP } = require('express-graphql');

const initServices = require('./subCategory.services');
const initResolvers = require('./subCategory.resolvers');

const typeDefs = require('./subCategory.typeDefs');

const IS_DEV = process.env.IS_DEV === 'true';

module.exports = async ({ api }) => {
  const SubCategoryService = await initServices();
  const SubCategoryResolvers = await initResolvers({ SubCategoryService });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: SubCategoryResolvers,
  });

  api.use(
    '/subCategory',
    graphqlHTTP({
      schema,
      graphiql: IS_DEV,
    }),
  );
  return;
};
