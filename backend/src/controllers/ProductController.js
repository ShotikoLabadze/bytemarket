import ProductService from "../services/ProductService.js";

class ProductController {
  async getProducts(req, res) {
    try {
      const { category } = req.query;
      const products = await ProductService.getProducts({ category });
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createProduct(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new ProductController();
