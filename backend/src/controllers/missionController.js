const missionService = require('../services/missionService');

const listMissions = async (req, res) => {
  const missions = await missionService.listMissions(req.user.id);
  return res.status(200).json(missions);
};

const createMission = async (req, res) => {
  try {
    const mission = await missionService.createMission(req.user.id, req.body);
    return res.status(201).json(mission);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateMissionStatus = async (req, res) => {
  try {
    const mission = await missionService.updateMissionStatus(req.user.id, req.params.id, req.body.status);
    return res.status(200).json(mission);
  } catch (error) {
    const status = error.message.includes('não encontrada') ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};

const deleteMission = async (req, res) => {
  try {
    await missionService.deleteMissionById(req.user.id, req.params.id);
    return res.status(200).json({ message: 'Missão excluída com sucesso.' });
  } catch (error) {
    const status = error.message.includes('não encontrada') ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};

module.exports = { listMissions, createMission, updateMissionStatus, deleteMission };
