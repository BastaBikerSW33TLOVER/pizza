const express = require('express');
const router = express.Router();

// Sample product data
let products = [];

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Get a specific product
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// Create a product
router.post('/', (req, res) => {
    const product = {
        id: products.length + 1,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    };
    products.push(product);
    res.status(201).json(product);
});

// Update a product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stock = req.body.stock;
    
    res.json(product);
});

// Delete a product
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');
    
    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = router;
