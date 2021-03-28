module.exports = /* GraphQL */ `
  type Product {
    id: String
    productName: String
    price: Float
    images: [String]
    sales: Float
    quantity: Int
  }

  type Cart {
    goods: [Product]
    total: Float
  }

  type Order {
    id: String
    buyerId: String
    cart: Cart
    createdAt: String
    confirmedAt: String
    shippedAt: String
    cancelAt: String
  }

  type Rate {
    id: String
    productId: String
    userId: String
    rate: Int
    comment: String
    createdAt: String
  }

  type User {
    id: String
    username: String
    password: String
    email: String
    phone: String
    avatar: String
    address: String
    createdAt: String
    orders: [Order]
    feedbacks: [Rate]
  }

  type Query {
    login(username: String, password: String): String
    getCurrentUser: User
    checkToken(token: String): Boolean
  }

  type Mutation {
    register(username: String, password: String, email: String): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
