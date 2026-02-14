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

  async searchProducts(req, res) {
    try {
      const { term } = req.query;
      if (!term)
        return res.status(400).json({ message: "Search term required" });
      const products = await ProductService.searchProducts(term);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getById(id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new ProductController();
