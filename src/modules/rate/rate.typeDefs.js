module.exports =  /* GraphQL */ `
  type Rate {
    id: String,
    productId: String,
    userId: String,
    rate: Int,
    comment: String
  }

  type Query {
    getUserRates: [Rate]
    getProductRates(productId: String): [Rate]
  }

  type Mutation {
    createRate(productId: String, rate: Int, comment: String): Boolean
    removeRate(id: String): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`