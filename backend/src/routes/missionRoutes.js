const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { listMissions, createMission, updateMissionStatus, deleteMission } = require('../controllers/missionController');

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /missions:
 *   get:
 *     summary: Retorna as missões do herói autenticado.
 *     tags:
 *       - Missions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de missões.
 *       401:
 *         description: Token inválido.
 */
router.get('/', listMissions);

/**
 * @swagger
 * /missions:
 *   post:
 *     summary: Cria uma missão para o herói.
 *     tags:
 *       - Missions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               xp:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Missão criada.
 *       400:
 *         description: Dados inválidos.
 */
router.post('/', createMission);

/**
 * @swagger
 * /missions/{id}:
 *   delete:
 *     summary: Exclui uma missão do herói.
 *     tags:
 *       - Missions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da missão
 *     responses:
 *       200:
 *         description: Missão excluída com sucesso.
 *       401:
 *         description: Token inválido.
 *       404:
 *         description: Missão não encontrada.
 */
router.delete('/:id', deleteMission);

/**
 * @swagger
 * /missions/{id}/status:
 *   patch:
 *     summary: Atualiza o status de uma missão.
 *     tags:
 *       - Missions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da missão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Missão atualizada.
 *       400:
 *         description: Atualização inválida.
 *       404:
 *         description: Missão não encontrada.
 */
router.patch('/:id/status', updateMissionStatus);

module.exports = router;
