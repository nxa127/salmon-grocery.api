const { makeExecutableSchema } = require('graphql-tools');
const { graphqlHTTP } = require('express-graphql');

const initServices = require('./user.services');
const initResolvers = require('./user.resolvers');

const typeDefs = require('./user.typeDefs');

const IS_DEV = process.env.IS_DEV === 'true';

module.exports = async ({ api, OrderServices, RateServices }) => {
  const UserServices = await initServices();
  const UserResolvers = await initResolvers({ UserServices, OrderServices, RateServices });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: UserResolvers,
  });

  api.use(
    '/user',
    graphqlHTTP({
      schema,
      graphiql: IS_DEV,
    }),
  );

  return;
};
