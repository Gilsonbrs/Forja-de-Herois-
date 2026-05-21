# Guia de Instalação e Execução

## Pré-requisitos

| Ferramenta | Uso |
| --- | --- |
| Node.js | Execução do frontend e backend |
| npm | Instalação de dependências |
| Git | Clonagem e versionamento |
| Cypress | Testes E2E |
| k6 | Testes de performance |

---

## Clonando o projeto

```bash
git clone <url-do-repositorio>
cd <pasta-do-repositorio>
```

---

## Variáveis de ambiente

Crie o arquivo `.env` no diretório `backend/`.

```bash
cd backend
cp .env.example .env
```

Exemplo mínimo:

```env
PORT=4000
JWT_SECRET=forja_de_herois_secret_local
```

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `PORT` | Não | Porta da API. Padrão esperado: `4000` |
| `JWT_SECRET` | Sim | Chave usada para assinar tokens JWT |

---

## Executando o backend

```bash
cd backend
npm install
npm run dev
```

A API será iniciada em:

```text
http://localhost:4000
```

A documentação Swagger estará disponível em:

```text
http://localhost:4000/api-docs
```

---

## Executando o frontend

```bash
cd frontend
npm install
npm run dev
```

A interface web será exibida em:

```text
http://localhost:3000
```

>  Dependendo da configuração do Vite, a porta pode variar caso `3000` já esteja em uso. Verifique a saída do terminal.

---

## Validando a instalação

| Verificação | Comando/URL | Resultado esperado |
| --- | --- | --- |
| API ativa | `http://localhost:4000/api-docs` | Swagger carregado |
| Frontend ativo | `http://localhost:3000` | Tela de login exibida |
| Testes backend | `npm test` em `backend/` | Suite Mocha aprovada |
| Build frontend | `npm run build` em `frontend/` | Build Vite gerado |

---

## Executando testes

### API

```bash
cd backend
npm test
```

### Cypress em modo interativo

```bash
cd frontend
npm run cy:open
```

### Cypress em modo headless

```bash
cd frontend
npm run cy:run
```

### Performance

```bash
cd backend
npx k6 run k6/login.js
npx k6 run k6/create_mission.js
```

---

## Problemas comuns

| Sintoma | Possível causa | Ação recomendada |
| --- | --- | --- |
| `401 Token ausente ou inválido` | Token não foi enviado | Fazer login novamente |
| Frontend não conecta na API | Backend fora do ar ou porta diferente | Conferir `http://localhost:4000` |
| Erro ao assinar JWT | `JWT_SECRET` ausente | Configurar `.env` |
| Porta em uso | Outro processo usando a porta | Alterar `PORT` ou finalizar processo |
| Dados antigos aparecem | Banco JSON preservado | Limpar `backend/src/data/db.json` em ambiente local |

