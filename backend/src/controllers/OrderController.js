import OrderService from "../services/OrderService.js";

class OrderController {
  async createOrder(req, res) {
    try {
      const { orderItems, totalPrice } = req.body;

      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "No order items" });
      }

      const order = await OrderService.createOrder(
        req.user._id,
        orderItems,
        totalPrice,
      );
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getUserOrders(req, res) {
    try {
      const orders = await OrderService.getUserOrders(req.user._id);
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new OrderController();
