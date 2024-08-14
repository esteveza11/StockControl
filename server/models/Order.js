const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  },
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
      },
      quantity: Number,
    },
  ],
});

const Order = model('Order', orderSchema);

module.exports = Order;
