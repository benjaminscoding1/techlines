import express from 'express';
import Product from '../models/Product.js';
const productRoutes = express.Router();

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

productRoutes.route('/').get(getProducts);

export default productRoutes;
