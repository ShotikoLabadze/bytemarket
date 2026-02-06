import UserService from "../services/UserService.js";

class UserController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.register(name, email, password);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new UserController();
