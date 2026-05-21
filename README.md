# Forja de Heróis

Projeto fullstack gamificado para treino de heróis, com frontend em React e backend em Node.js. O sistema oferece autenticação, gerenciamento de missões, progresso de experiência e documentação Swagger para consumo da API.

## Visão Geral

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Persistência atual:** arquivo JSON local em `backend/src/data/db.json`
- **Documentação:** Swagger UI (`/api-docs`)
- **Testes:** Mocha/Supertest para API e Cypress para interface
- **Automação:** GitHub Actions para pipeline de CI/CD

## Estrutura do Projeto

- `backend/` - API REST, lógica de negócio e persistência local
- `frontend/` - Aplicação web de login e dashboard gamificado
- `docs/wiki/` - Wiki profissional pronta para publicação no GitHub Wiki

## Executando localmente

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

A API será iniciada em `http://localhost:4000` por padrão.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A interface web será exibida em `http://localhost:3000`.

## Swagger

A documentação da API está disponível em:

```text
http://localhost:4000/api-docs
```

## Rotas principais

- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Autenticar usuário
- `GET /missions` - Listar missões do usuário autenticado
- `POST /missions` - Criar missão
- `PATCH /missions/{id}/status` - Atualizar status da missão
- `DELETE /missions/{id}` - Excluir missão

## Testes

### API

```bash
cd backend
npm test
```

### Cypress

```bash
cd frontend
npm run cy:open
```

### Performance

```bash
cd backend
npx k6 run k6/login.js
```

## Wiki

A documentação completa está em `docs/wiki/` e pode ser publicada diretamente no GitHub Wiki.

## Notas

- Certifique-se de ter o Node.js instalado na versão compatível com o projeto.
- Caso precise alterar a porta do backend, ajuste o `PORT` no arquivo `.env`.
- Configure `JWT_SECRET` no `.env` antes de rodar autenticação local.
- O banco local JSON é criado automaticamente na primeira execução.
