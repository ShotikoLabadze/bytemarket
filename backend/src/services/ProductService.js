import Product from "../models/Product.js";

class ProductService {
  async getProducts(filter = {}) {
    const query = {};

    if (filter.category) query.category = filter.category;

    return await Product.find(query);
  }

  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }
}

export default new ProductService();
