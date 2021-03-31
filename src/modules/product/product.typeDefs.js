module.exports = /* GraphQL */ `
  type Rate {
    id: String
    productId: String
    userId: String
    rate: Int
    comment: String
    createAt: String
  }

  type Product {
    id: String
    category: String
    subCategory: String
    productName: String
    material: String
    size: String
    color: String
    brand: String
    sex: String
    age: String
    price: Int
    sale: Int
    description: String
    rates: [Rate]
    inStock: Int
    images: [String]
    onSales: Boolean
    createAt: String
  }

  type Query {
    getProducts: [Product]
    getProduct(productId: String): Product
  }

  type Mutation {
    createProduct(
      category: String
      subCategory: String
      productName: String
      material: String!
      size: String!
      color: String!
      brand: String!
      sex: String!
      age: String!
      price: Int
      sale: Int!
      description: String
      images: [String]!
      inStock: Int
      onSales: Boolean!
    ): Boolean
    updateProduct(
      productId: String
      category: String
      subCategory: String
      productName: String
      material: String
      size: String
      color: String
      brand: String!
      sex: String!
      age: String!
      Price: Int
      sale: Int!
      description: String
      images: [String]
      inStock: Int
      onSales: Boolean
    ): Boolean
    removeProduct(productId: String): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
