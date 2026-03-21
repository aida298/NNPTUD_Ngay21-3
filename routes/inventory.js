const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

// Get all inventories with product details
router.get('/', async (req, res) => {
  try {
    const inventories = await Inventory.find().populate('product');
    res.json(inventories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get inventory by ID with product details
router.get('/:id', async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate('product');
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add stock
router.post('/add-stock', async (req, res) => {
  const { product, quantity } = req.body;
  if (!product || quantity <= 0) return res.status(400).json({ error: 'Invalid product or quantity' });

  try {
    const inventory = await Inventory.findOneAndUpdate(
      { product },
      { $inc: { stock: quantity } },
      { new: true, upsert: true }
    ).populate('product');
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove stock
router.post('/remove-stock', async (req, res) => {
  const { product, quantity } = req.body;
  if (!product || quantity <= 0) return res.status(400).json({ error: 'Invalid product or quantity' });

  try {
    const inventory = await Inventory.findOne({ product });
    if (!inventory || inventory.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    inventory.stock -= quantity;
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reservation
router.post('/reservation', async (req, res) => {
  const { product, quantity } = req.body;
  if (!product || quantity <= 0) return res.status(400).json({ error: 'Invalid product or quantity' });

  try {
    const inventory = await Inventory.findOne({ product });
    if (!inventory || inventory.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    inventory.stock -= quantity;
    inventory.reserved += quantity;
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sold
router.post('/sold', async (req, res) => {
  const { product, quantity } = req.body;
  if (!product || quantity <= 0) return res.status(400).json({ error: 'Invalid product or quantity' });

  try {
    const inventory = await Inventory.findOne({ product });
    if (!inventory || inventory.reserved < quantity) return res.status(400).json({ error: 'Insufficient reserved stock' });

    inventory.reserved -= quantity;
    inventory.soldCount += quantity;
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;