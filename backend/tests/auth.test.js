const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
const { clearDatabase } = require('../src/models/localDb');

describe('Auth API', () => {
  before(async () => {
    clearDatabase();
  });

  after(async () => {
    clearDatabase();
  });

  it('deve registrar um usuário e retornar dados sem senha', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Aisha', email: 'aisha@forja.io', password: 'Segura123' });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('email', 'aisha@forja.io');
    expect(response.body).to.have.property('level', 1);
  });

  it('deve autenticar usuário e fornecer token JWT', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'aisha@forja.io', password: 'Segura123' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
    expect(response.body.user).to.have.property('email', 'aisha@forja.io');
  });
});
