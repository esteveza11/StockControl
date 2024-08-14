const { Schema, model } = require('mongoose');

const inventorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  location: String,
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
  },
  expirationDate: Date,
});

const Inventory = model('Inventory', inventorySchema);

module.exports = Inventory;
