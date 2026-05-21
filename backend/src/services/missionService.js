const {
  getMissionsByUserId,
  createMission: createMissionRecord,
  getMissionById,
  getUserById,
  updateMission,
  deleteMission,
  updateUser
} = require('../models/localDb');

const listMissions = async (userId) => {
  return getMissionsByUserId(userId);
};

const createMission = async (userId, { title, difficulty, xp }) => {
  if (!title || !difficulty || !xp) {
    throw new Error('Título, dificuldade e XP são obrigatórios.');
  }
  if (typeof xp !== 'number' || xp <= 0) {
    throw new Error('XP deve ser um número maior que 0.');
  }

  return createMissionRecord({ title, difficulty, xp, userId });
};

const updateMissionStatus = async (userId, missionId, status) => {
  if (!['pending', 'in_progress', 'completed'].includes(status)) {
    throw new Error('Status inválido.');
  }

  const mission = getMissionById(missionId);
  if (!mission || mission.userId !== userId) {
    throw new Error('Missão não encontrada.');
  }

  if (status === 'completed' && mission.status !== 'in_progress') {
    throw new Error('A missão deve estar em andamento antes de ser concluída.');
  }

  if (mission.status === 'completed') {
    return mission;
  }

  const updated = updateMission(missionId, { status });

  if (status === 'completed') {
    return addXpToUser(userId, mission);
  }

  return updated;
};

const addXpToUser = async (userId, mission) => {
  const user = getUserById(userId);
  const totalXp = user.xp + mission.xp;
  const newLevel = calculateLevel(totalXp);

  const updatedUser = updateUser(userId, {
    xp: totalXp,
    level: newLevel
  });

  updateMission(mission.id, { status: 'completed' });

  return {
    mission: { ...mission, status: 'completed' },
    user: {
      xp: updatedUser.xp,
      level: updatedUser.level
    }
  };
};

const deleteMissionById = async (userId, missionId) => {
  const mission = getMissionById(missionId);
  if (!mission || mission.userId !== userId) {
    throw new Error('Missão não encontrada.');
  }

  deleteMission(missionId);
  return mission;
};

const calculateLevel = (xp) => {
  return Math.floor(xp / 100) + 1;
};

module.exports = { listMissions, createMission, updateMissionStatus, deleteMissionById };
