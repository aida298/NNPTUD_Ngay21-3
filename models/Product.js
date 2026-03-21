const mongoose = require('mongoose');
const Inventory = require('./Inventory');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  // Add other product fields as needed
}, { timestamps: true });

// Hook to create inventory when product is created
productSchema.post('save', async function(doc) {
  try {
    const inventory = new Inventory({ product: doc._id });
    await inventory.save();
  } catch (error) {
    console.error('Error creating inventory:', error);
  }
});

module.exports = mongoose.model('Product', productSchema);