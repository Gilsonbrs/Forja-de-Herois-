const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const dbPath = path.resolve(__dirname, '../data/db.json');

const ensureDatabase = () => {
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], missions: [] }, null, 2));
  }
};

const readDatabase = () => {
  ensureDatabase();
  const file = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(file);
};

const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const getUserByEmail = (email) => {
  const { users } = readDatabase();
  return users.find((user) => user.email === email) || null;
};

const getUserById = (id) => {
  const { users } = readDatabase();
  return users.find((user) => user.id === id) || null;
};

const createUser = ({ name, email, password }) => {
  const data = readDatabase();
  const user = {
    id: randomUUID(),
    name,
    email,
    password,
    xp: 0,
    level: 1
  };
  data.users.push(user);
  writeDatabase(data);
  return user;
};

const updateUser = (id, updates) => {
  const data = readDatabase();
  const userIndex = data.users.findIndex((user) => user.id === id);
  if (userIndex === -1) return null;
  data.users[userIndex] = { ...data.users[userIndex], ...updates };
  writeDatabase(data);
  return data.users[userIndex];
};

const getMissionsByUserId = (userId) => {
  const { missions } = readDatabase();
  return missions
    .filter((mission) => mission.userId === userId)
    .sort((a, b) => a.status.localeCompare(b.status));
};

const getMissionById = (id) => {
  const { missions } = readDatabase();
  return missions.find((mission) => mission.id === id) || null;
};

const createMission = ({ title, difficulty, xp, userId }) => {
  const data = readDatabase();
  const mission = {
    id: randomUUID(),
    title,
    difficulty,
    xp,
    status: 'pending',
    userId
  };
  data.missions.push(mission);
  writeDatabase(data);
  return mission;
};

const updateMission = (id, updates) => {
  const data = readDatabase();
  const missionIndex = data.missions.findIndex((mission) => mission.id === id);
  if (missionIndex === -1) return null;
  data.missions[missionIndex] = { ...data.missions[missionIndex], ...updates };
  writeDatabase(data);
  return data.missions[missionIndex];
};

const deleteMission = (id) => {
  const data = readDatabase();
  const missionIndex = data.missions.findIndex((mission) => mission.id === id);
  if (missionIndex === -1) return null;
  const [deletedMission] = data.missions.splice(missionIndex, 1);
  writeDatabase(data);
  return deletedMission;
};

const clearDatabase = () => {
  writeDatabase({ users: [], missions: [] });
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  getMissionsByUserId,
  getMissionById,
  createMission,
  updateMission,
  deleteMission,
  clearDatabase
};
