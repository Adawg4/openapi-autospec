const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4001;

// Sample data for products
let products = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 19.99 }
];

// Middleware to parse JSON
app.use(bodyParser.json());

// Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Get a single product
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(prod => prod.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Add a new product
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const id = products.length + 1;
    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update a product
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const index = products.findIndex(prod => prod.id === id);
    if (index !== -1) {
        products[index] = { id, name, price };
        res.json(products[index]);
    } else {
        res.status(404).send('Product not found');
    }
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(prod => prod.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).send('Product not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
