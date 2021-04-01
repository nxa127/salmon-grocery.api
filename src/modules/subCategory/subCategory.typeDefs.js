module.exports = /* GraphQL */ `
  type SubCategory {
    id: String
    categoryId: String
    name: String
    createdAt: String
  }

  type Query {
    getSubCategories: [SubCategory]
  }

  type Mutation {
    create(name: String, categoryId: String): Boolean
    update(name: String, categoryId: String): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
