import Product from "../models/Product.js";

class ProductService {
  async getProducts(filter = {}) {
    const query = {};

    if (filter.category && filter.category !== "All") {
      query.category = filter.category;
    }

    let mongooseQuery = Product.find(query);

    if (filter.sort === "asc") {
      mongooseQuery = mongooseQuery.sort({ price: 1 });
    } else if (filter.sort === "desc") {
      mongooseQuery = mongooseQuery.sort({ price: -1 });
    } else {
      mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
    }

    return await mongooseQuery;
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

  async getById(id) {
    return await Product.findById(id);
  }
}

export default new ProductService();
