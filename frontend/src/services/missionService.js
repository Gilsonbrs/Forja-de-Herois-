import api from './api';

export const fetchMissions = async () => {
  const response = await api.get('/missions');
  return response.data;
};

export const createMission = async (mission) => {
  const response = await api.post('/missions', mission);
  return response.data;
};

export const updateMissionStatus = async (id, status) => {
  const response = await api.patch(`/missions/${id}/status`, { status });
  return response.data;
};

export const deleteMission = async (id) => {
  const response = await api.delete(`/missions/${id}`);
  return response.data;
};
