const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/localDb');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token ausente ou inválido.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = getUserById(payload.userId);
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Falha na autenticação.' });
  }
};

module.exports = authMiddleware;
