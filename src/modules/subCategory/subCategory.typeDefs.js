module.exports = /* GraphQL */ `
  type SubCategory {
    id: String,
    categoryId: String
    name: String
    createdAt: String
  }  

  type Query {}

  type Mutation {
    createSubCategory(name: String, categoryId: String): Boolean
    updateCategory(name: Stirng, categoryId: String): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`