describe('Login e Autenticação', () => {
  const testUser = {
    name: 'Test Hero',
    email: `teste-${Date.now()}@forjaherois.com`,
    password: 'TestPassword123'
  };

  beforeEach(() => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });

  it('deve registrar um novo usuário com sucesso', () => {
    cy.get('button').contains('Cadastre-se').click();
    cy.get('input[placeholder="Nome do herói"]').type(testUser.name);
    cy.get('input[type=email]').type(testUser.email);
    cy.get('input[type=password]').type(testUser.password);
    cy.get('button[type=submit]').click();
    cy.contains('Conta criada com sucesso').should('be.visible');
  });

  it('deve fazer login com credenciais válidas e redirecionar', () => {
    const existingEmail = 'heroi@forja.com';
    const existingPassword = 'Heroi123';

    cy.request('POST', 'http://localhost:4000/auth/register', {
      name: 'Herói Teste',
      email: existingEmail,
      password: existingPassword
    }).then((response) => {
      expect(response.status).to.equal(201);
    });

    cy.get('input[type=email]').type(existingEmail);
    cy.get('input[type=password]').type(existingPassword);
    cy.get('button[type=submit]').click();

    cy.url({ timeout: 5000 }).should('include', '/dashboard');
    cy.get('h1').should('contain', 'Herói Teste');
  });

  it('deve exibir erro com e-mail não encontrado', () => {
    cy.get('input[type=email]').type('naoexiste@forja.com');
    cy.get('input[type=password]').type('qualquersenha123');
    cy.get('button[type=submit]').click();

    cy.contains('Usuário não encontrado').should('be.visible');
  });

  it('deve exibir erro com senha incorreta', () => {
    const existingEmail = 'teste-senha@forja.com';
    const correctPassword = 'CorretoPassword123';

    cy.request('POST', 'http://localhost:4000/auth/register', {
      name: 'Teste Senha',
      email: existingEmail,
      password: correctPassword
    });

    cy.get('input[type=email]').type(existingEmail);
    cy.get('input[type=password]').type('SenhaErrada123');
    cy.get('button[type=submit]').click();

    cy.contains('Acesso negado').should('be.visible');
  });

  it('deve alternar entre login e registro', () => {
    cy.contains('Cadastre-se').click();
    cy.get('input[placeholder="Nome do herói"]').should('exist');
    cy.contains('Login').click();
    cy.get('input[placeholder="Nome do herói"]').should('not.exist');
  });
});

describe('Fluxo Dashboard - Missões', () => {
  const testUser = {
    email: `dashboard-${Date.now()}@forja.com`,
    password: 'Dashboard123',
    name: 'Dashboard Tester'
  };

  before(() => {
    cy.request('POST', 'http://localhost:4000/auth/register', {
      name: testUser.name,
      email: testUser.email,
      password: testUser.password
    });
  });

  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type=email]').type(testUser.email);
    cy.get('input[type=password]').type(testUser.password);
    cy.get('button[type=submit]').click();
    cy.url({ timeout: 5000 }).should('include', '/dashboard');
  });

  it('deve criar uma nova missão', () => {
    cy.get('input[placeholder="Título da missão"]').type('Desafiar o Dragão');
    cy.get('select').select('hard');
    cy.get('input[type=number]').clear().type('200');
    cy.contains('Adicionar missão').click();
    cy.contains('Missão criada com sucesso').should('be.visible');
    cy.contains('Desafiar o Dragão').should('be.visible');
  });

  it('deve iniciar uma missão', () => {
    cy.get('input[placeholder="Título da missão"]').type('Primeira Aventura');
    cy.get('select').select('easy');
    cy.get('input[type=number]').clear().type('50');
    cy.contains('Adicionar missão').click();

    cy.contains('Primeira Aventura').parent().within(() => {
      cy.contains('Iniciar').click();
    });

    cy.contains('Missão atualizada').should('be.visible');
  });

  it('deve concluir uma missão e ganhar XP', () => {
    cy.get('input[placeholder="Título da missão"]').type('Missão XP');
    cy.get('select').select('medium');
    cy.get('input[type=number]').clear().type('100');
    cy.contains('Adicionar missão').click();

    cy.contains('Missão XP').parent().within(() => {
      cy.contains('Iniciar').click();
    });

    cy.wait(500);

    cy.contains('Missão XP').parent().within(() => {
      cy.contains('Concluir').click();
    });

    cy.contains('Missão atualizada').should('be.visible');
  });

  it('deve deletar uma missão', () => {
    cy.get('input[placeholder="Título da missão"]').type('Missão para Deletar');
    cy.get('select').select('easy');
    cy.get('input[type=number]').clear().type('25');
    cy.contains('Adicionar missão').click();

    cy.contains('Missão para Deletar').parent().within(() => {
      cy.contains('Deletar').click();
    });

    cy.contains('Missão excluída com sucesso').should('be.visible');
    cy.contains('Missão para Deletar').should('not.exist');
  });

  it('deve fazer logout com sucesso', () => {
    cy.contains('Sair').click();
    cy.url().should('include', '/login');
  });
});
