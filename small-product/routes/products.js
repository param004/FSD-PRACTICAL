// routes/products.js - Product routes for scalable future features
import express from 'express';

const router = express.Router();

// Sample product data (in a real app, this would come from a database)
const sampleProducts = [
  {
    id: 1,
    name: "Premium Coffee Mug",
    price: 15.99,
    description: "High-quality ceramic coffee mug perfect for your morning brew",
    category: "kitchenware",
    inStock: true,
    image: "/images/coffee-mug.jpg"
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "Crystal clear audio with 20-hour battery life",
    category: "electronics",
    inStock: true,
    image: "/images/headphones.jpg"
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 299.99,
    description: "Comfortable office chair with lumbar support",
    category: "furniture",
    inStock: false,
    image: "/images/office-chair.jpg"
  }
];

// GET /api/products - Get all products
router.get('/', (req, res) => {
  try {
    const { category, inStock } = req.query;
    let filteredProducts = [...sampleProducts];

    // Filter by category if provided
    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by stock status if provided
    if (inStock !== undefined) {
      const stockFilter = inStock === 'true';
      filteredProducts = filteredProducts.filter(
        product => product.inStock === stockFilter
      );
    }

    res.json({
      success: true,
      message: "Products retrieved successfully",
      data: filteredProducts,
      count: filteredProducts.length,
      total: sampleProducts.length,
      filters: { category, inStock }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving products",
      error: error.message
    });
  }
});

// GET /api/products/:id - Get specific product
router.get('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = sampleProducts.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found`,
        availableIds: sampleProducts.map(p => p.id)
      });
    }

    res.json({
      success: true,
      message: "Product retrieved successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving product",
      error: error.message
    });
  }
});

// POST /api/products - Add new product (for future use)
router.post('/', (req, res) => {
  try {
    const { name, price, description, category, inStock } = req.body;

    // Basic validation
    if (!name || !price || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, price, description"
      });
    }

    const newProduct = {
      id: sampleProducts.length + 1,
      name,
      price: parseFloat(price),
      description,
      category: category || "general",
      inStock: inStock !== undefined ? inStock : true,
      image: `/images/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      createdAt: new Date().toISOString()
    };

    sampleProducts.push(newProduct);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message
    });
  }
});

// GET /api/products/categories - Get all product categories
router.get('/categories/list', (req, res) => {
  try {
    const categories = [...new Set(sampleProducts.map(p => p.category))];
    
    res.json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
      count: categories.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving categories",
      error: error.message
    });
  }
});

export default router;