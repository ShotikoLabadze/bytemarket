import Order from "../models/Order.js";
import Product from "../models/Product.js";
class OrderService {
  async createOrder(userId, orderItems, totalPrice) {
    const updateStock = orderItems.map((item) => {
      return Product.updateOne(
        {
          _id: item.Product,
        },
        {
          $inc: { stock: -item.qty },
        },
      );
    });

    await Promise.all(updateStock);

    const order = new Order({
      user: userId,
      orderItems,
      totalPrice,
      isPaid: false,
    });
    return await order.save();
  }

  async getUserOrders(userId) {
    return await Order.find({ user: userId }).populate(
      "orderItems.Product",
      "name price",
    );
  }

  async getAllOrders() {
    return await Order.find().populate("user", "name email");
  }
}
export default new OrderService();
