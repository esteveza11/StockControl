const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    role: String
  }

  type Inventory {
    _id: ID
    name: String
    sku: String
    quantity: Int
    location: String
    supplier: Supplier
    expirationDate: String
  }

  type Supplier {
    _id: ID
    name: String
    contact: String
    orderHistory: [Order]
  }

  type Order {
    _id: ID
    date: String
    supplier: Supplier
    status: String
    items: [OrderItem]
  }

  type OrderItem {
    item: Inventory
    quantity: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    inventoryItems: [Inventory]
    suppliers: [Supplier]
    orders: [Order]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String!, role: String!): User
    addInventory(name: String!, sku: String!, quantity: Int!, location: String, supplier: ID, expirationDate: String): Inventory
    updateInventory(id: ID!, name: String!, sku: String!, quantity: Int!, location: String, supplier: ID, expirationDate: String): Inventory
    deleteInventory(id: ID!): Inventory
    addSupplier(name: String!, contact: String!): Supplier
    updateSupplier(id: ID!, name: String!, contact: String!): Supplier
    deleteSupplier(id: ID!): Supplier
    addOrder(date: String!, supplier: ID!, status: String!, items: [OrderItemInput]!): Order
    updateOrder(id: ID!, date: String!, supplier: ID!, status: String!, items: [OrderItemInput]!): Order
    deleteOrder(id: ID!): Order
  }

  input OrderItemInput {
    item: ID
    quantity: Int
  }
`;

module.exports = typeDefs;
