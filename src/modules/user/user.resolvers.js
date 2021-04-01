module.exports = async ({ UserServices, OrderServices, RateServices }) => ({
  Query: {
    login: (_, { username, password }) => UserServices.login(username, password),
    getCurrentUser: (_, { userId }) => UserServices.getUserInfo(userId),
  },
  Mutation: {
    register: (_, { username, password, email }) =>
      UserServices.register({ username, password, email }),
    update: (_, { password, email, address, phone, avatar }, { userId }) =>
      UserServices.update({ userId, password, email, address, phone, avatar }),
  },
  User: {
    id: user => user._id,
    orders: user => OrderServices.getUserOrders(user._id),
    feedbacks: user => RateServices.getUserRates(user._id),
  },
});
