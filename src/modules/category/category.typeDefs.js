module.exports = /* GraphQL */ `
  type SubCategory {
    id: String,
    categoryId: String
    name: String,
    createdAt: String
  }  

  type Category {
    id: String
    name: String
    subCategories: [SubCategory]
    createdAt: String
  }

  type Query {
    getCategories: [Category],
    getCategory(categoryId): Category 
  }

  type Mutation {
    createCategory(name: String, subCategories: [String]!): Boolean
    updateCategory(name: Stirng, subCategories: [String]): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
