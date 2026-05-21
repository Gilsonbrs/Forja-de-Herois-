const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
const { clearDatabase } = require('../src/models/localDb');

let token;
let userId;
let missionId;

describe('Missions API', () => {
  before(async () => {
    clearDatabase();

    const register = await request(app)
      .post('/auth/register')
      .send({ name: 'Caio', email: 'caio@forja.io', password: 'Senha123' });
    userId = register.body.id;

    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'caio@forja.io', password: 'Senha123' });

    token = login.body.token;
  });

  after(async () => {
    clearDatabase();
  });

  it('deve criar uma missão para o usuário', async () => {
    const response = await request(app)
      .post('/missions')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Treinar com espada de luz', difficulty: 'hard', xp: 120 });

    expect(response.status).to.equal(201);
    expect(response.body).to.include({ title: 'Treinar com espada de luz', difficulty: 'hard', status: 'pending' });
    missionId = response.body.id;
  });

  it('deve iniciar a missão e depois concluir para ganhar XP', async () => {
    const start = await request(app)
      .patch(`/missions/${missionId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'in_progress' });

    expect(start.status).to.equal(200);
    expect(start.body).to.include({ status: 'in_progress' });

    const complete = await request(app)
      .patch(`/missions/${missionId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' });

    expect(complete.status).to.equal(200);
    expect(complete.body).to.have.property('mission');
    expect(complete.body.mission.status).to.equal('completed');
    expect(complete.body.user).to.have.property('xp', 120);
    expect(complete.body.user).to.have.property('level', 2);
  });

  it('deve listar missões do usuário', async () => {
    const response = await request(app)
      .get('/missions')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('title');
  });
});
