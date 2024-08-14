const { AuthenticationError } = require('apollo-server-express');
const { User, Inventory, Supplier, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    users: async () => {
      return User.find();
    },
    inventoryItems: async () => {
      return Inventory.find().populate('supplier');
    },
    suppliers: async () => {
      return Supplier.find().populate('orderHistory.items.item');
    },
    orders: async () => {
      return Order.find().populate('supplier').populate('items.item');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { username, email, role }, context) => {
      if (context.user && context.user.role === 'admin') {
        return User.findByIdAndUpdate(context.user._id, { username, email, role }, { new: true });
      }
      throw new AuthenticationError('You do not have permission to do this!');
    },
    addInventory: async (parent, args) => {
      return Inventory.create(args);
    },
    updateInventory: async (parent, args) => {
      return Inventory.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteInventory: async (parent, { id }) => {
      return Inventory.findByIdAndDelete(id);
    },
    addSupplier: async (parent, args) => {
      return Supplier.create(args);
    },
    updateSupplier: async (parent, args) => {
      return Supplier.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteSupplier: async (parent, { id }) => {
      return Supplier.findByIdAndDelete(id);
    },
    addOrder: async (parent, args) => {
      return Order.create(args);
    },
    updateOrder: async (parent, args) => {
      return Order.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteOrder: async (parent, { id }) => {
      return Order.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
