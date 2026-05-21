const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../models/localDb');

const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error('Nome, email e senha são obrigatórios.');
  }

  const existing = getUserByEmail(email);
  if (existing) {
    throw new Error('Email já cadastrado.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = createUser({ name, email, password: hashedPassword });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    xp: user.xp,
    level: user.level
  };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios.');
  }

  const user = getUserByEmail(email);
  if (!user) {
    throw new Error('Credenciais inválidas.');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Credenciais inválidas.');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      xp: user.xp,
      level: user.level
    }
  };
};

module.exports = { register, login };
