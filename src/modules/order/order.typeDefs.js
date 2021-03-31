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
    products: [Product]
    total: Float
  }

  type Order {
    id: String
    buyer: String
    cart: Cart
    status: String
    createdAt: String
    confirmedAt: String
    shippedAt: String
    canceledAt: String
  }

  type Query {
    getOrders: [Orders]
    getOrder(orderId: String): order
  }

  type Mutation {
    createOrder(products: [Product], buyer: String): Boolean
    updateOrderStatus(orderId: String, status: String): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
