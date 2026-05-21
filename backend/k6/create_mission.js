import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 8,
  duration: '20s'
};

const loginPayload = JSON.stringify({ email: 'test@forja.io', password: 'Teste123!' });
const headers = { 'Content-Type': 'application/json' };

export default function () {
  const loginRes = http.post('http://localhost:4000/auth/login', loginPayload, { headers });
  const token = loginRes.json('token');

  check(loginRes, {
    'login ok': (r) => r.status === 200,
    'got token': () => token !== undefined
  });

  const missionPayload = JSON.stringify({
    title: `Carga de missão ${Math.random().toString(16).slice(2)}`,
    difficulty: 'medium',
    xp: 80
  });

  const missionRes = http.post('http://localhost:4000/missions', missionPayload, {
    headers: { ...headers, Authorization: `Bearer ${token}` }
  });

  check(missionRes, {
    'mission created': (r) => r.status === 201
  });

  sleep(1);
}
