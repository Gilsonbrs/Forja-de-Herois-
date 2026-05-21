const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const payload = await authService.login(req.body);
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
