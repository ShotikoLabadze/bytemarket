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

  async searchProducts(key) {
    const regex = new RegExp(key, "i");
    return await Product.find({
      $or: [{ name: regex }, { category: regex }],
    });
  }
}

export default new ProductService();
