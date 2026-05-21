import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '20s'
};

export default function () {
  const payload = JSON.stringify({
    email: 'test@forja.io',
    password: 'Teste123!'
  });

  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('http://localhost:4000/auth/login', payload, { headers });

  check(res, {
    'login ok': (r) => r.status === 200,
  });
  sleep(1);
}
