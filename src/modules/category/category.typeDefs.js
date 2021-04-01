module.exports = /* GraphQL */ `
  type SubCategory {
    id: String
    categoryId: String
    name: String
    createdAt: String
  }

  type Category {
    id: String
    name: String
    subCategories: [SubCategory]
    createdAt: String
  }

  type Query {
    getCategories: [Category]
    getCategory(id: String): Category
  }

  type Mutation {
    create(name: String, subCategories: [String]!): Boolean
    update(name: String, subCategories: [String]): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
