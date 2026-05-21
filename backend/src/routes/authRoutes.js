const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo herói.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Herói criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um herói.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post('/login', login);

module.exports = router;
