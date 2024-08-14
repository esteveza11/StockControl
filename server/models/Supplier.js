const { Schema, model } = require('mongoose');

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  orderHistory: [
    {
      orderDate: Date,
      items: [
        {
          item: {
            type: Schema.Types.ObjectId,
            ref: 'Inventory',
          },
          quantity: Number,
        },
      ],
    },
  ],
});

const Supplier = model('Supplier', supplierSchema);

module.exports = Supplier;
