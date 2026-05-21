# Forja de Heróis

Bem-vindo à wiki oficial do **Forja de Heróis**, um projeto fullstack gamificado para treino, evolução e acompanhamento de missões de heróis.

Esta documentação foi organizada para apoiar desenvolvimento, QA, manutenção e apresentação técnica do projeto no GitHub Wiki.

---

## Status da documentação

| Área | Status | Página |
| --- | --- | --- |
| Produto | Documentado | [Produto e Visão](Produto-e-Visao) |
| Arquitetura | Documentado | [Arquitetura da Aplicação](Arquitetura-da-Aplicacao) |
| Execução local | Documentado | [Guia de Instalação e Execução](Guia-de-Instalacao-e-Execucao) |
| API | Documentado | [API e Swagger](API-e-Swagger) |
| Regras de negócio | Documentado | [Regras de Negócio](Regras-de-Negocio) |
| Qualidade | Documentado | [QA - Estratégia de Testes](QA-Estrategia-de-Testes) |
| Plano de testes | Documentado | [QA - Plano de Testes](QA-Plano-de-Testes) |
| Pipeline | Documentado | [CI/CD e Ambientes](CI-CD-e-Ambientes) |

---

## Navegação principal

### Produto

- [Produto e Visão](Produto-e-Visao)
- [Regras de Negócio](Regras-de-Negocio)

### Técnica

- [Arquitetura da Aplicação](Arquitetura-da-Aplicacao)
- [Guia de Instalação e Execução](Guia-de-Instalacao-e-Execucao)
- [API e Swagger](API-e-Swagger)
- [CI/CD e Ambientes](CI-CD-e-Ambientes)

### Qualidade

- [QA - Estratégia de Testes](QA-Estrategia-de-Testes)
- [QA - Plano de Testes](QA-Plano-de-Testes)

---

## Sobre o projeto

O **Forja de Heróis** transforma tarefas em missões. A proposta é oferecer uma experiência simples de autenticação, criação de missões, progressão por XP e evolução de nível, usando uma interface web em React e uma API REST em Node.js.

### Principais capacidades

| Funcionalidade | Descrição |
| --- | --- |
| Autenticação | Registro e login de usuários com JWT |
| Missões | Criação, listagem, atualização de status e exclusão |
| Gamificação | Acúmulo de XP e cálculo automático de nível |
| Documentação de API | Swagger UI disponível em `/api-docs` |
| Testes | Cobertura de API com Mocha/Supertest e E2E com Cypress |
| Performance | Scripts k6 para cenários críticos |

---

## Stack resumida

| Camada | Tecnologias |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, Axios, React Router |
| Backend | Node.js, Express, JWT, bcryptjs |
| Persistência atual | Arquivo JSON local em `backend/src/data/db.json` |
| Documentação | Swagger UI, swagger-jsdoc |
| Testes | Mocha, Chai, Supertest, Cypress, k6 |
| Automação | GitHub Actions |

>  **Nota de alinhamento:** o README informa Prisma + SQLite como stack planejada ou esperada. O código atual do repositório usa persistência local em JSON. Esta wiki registra o estado atual da implementação e destaca a migração para Prisma/SQLite como evolução recomendada.

---

## Links úteis

- [Documentação da API local](http://localhost:4000/api-docs)
- [Frontend local](http://localhost:3000)
- [Backend local](http://localhost:4000)
- [GitHub Actions](../actions)

