const express = require('express');
const path = require('path');

const productRoutes = require('./routes/product');

const app = express();

// Middleware pour gérer les headers CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Servir les images
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

// Middleware pour traiter les requêtes JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes API
app.use('/api/products', productRoutes);

module.exports = app;
