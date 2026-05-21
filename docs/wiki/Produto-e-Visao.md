# 📘 Produto e Visão

## 🎯 Objetivo

O **Forja de Heróis** é uma aplicação gamificada para transformar atividades em missões, permitindo que usuários acompanhem progresso, ganhem experiência e evoluam de nível conforme completam desafios.

A experiência combina uma narrativa de treinamento heroico com fluxos comuns de produtividade: autenticar, cadastrar missões, iniciar atividades, concluir tarefas e acompanhar evolução.

---

## 👥 Público-alvo

| Perfil | Necessidade atendida |
| --- | --- |
| Estudantes | Organizar estudos como missões e visualizar progresso |
| Pessoas em rotina de treino | Transformar hábitos em desafios com recompensa por XP |
| Desenvolvedores iniciantes | Estudar uma aplicação fullstack com autenticação e testes |
| Avaliadores técnicos | Validar arquitetura, API, fluxo E2E e documentação |

---

## 🧭 Proposta de valor

- Centralizar missões pessoais em uma interface gamificada.
- Recompensar conclusão de tarefas com XP.
- Tornar o avanço do usuário visível por nível.
- Fornecer uma base fullstack simples, testável e documentada.
- Servir como projeto demonstrável em portfólio técnico.

---

## 🧑‍🚀 Fluxo principal do usuário

1. O usuário acessa a aplicação web.
2. Cria uma conta informando nome, e-mail e senha.
3. Realiza login e recebe uma sessão autenticada por token.
4. Entra no dashboard gamificado.
5. Cria uma missão com título, dificuldade e XP.
6. Inicia a missão.
7. Conclui a missão.
8. Recebe XP e tem seu nível recalculado automaticamente.
9. Visualiza suas missões e progresso.

---

## 🗺️ Jornada resumida

| Etapa | Tela/API | Resultado esperado |
| --- | --- | --- |
| Registro | `POST /auth/register` | Conta criada sem expor senha |
| Login | `POST /auth/login` | Token JWT retornado |
| Dashboard | Frontend React | Usuário visualiza progresso |
| Criar missão | `POST /missions` | Missão criada com status `pending` |
| Iniciar missão | `PATCH /missions/{id}/status` | Status alterado para `in_progress` |
| Concluir missão | `PATCH /missions/{id}/status` | XP somado e nível atualizado |
| Excluir missão | `DELETE /missions/{id}` | Missão removida do usuário |

---

## 📌 Escopo funcional

### ✅ Incluído

- Registro de usuário.
- Login com JWT.
- Proteção de rotas autenticadas.
- CRUD parcial de missões.
- Atualização de status.
- Cálculo de XP e nível.
- Documentação Swagger.
- Testes automatizados de API.
- Testes E2E com Cypress.
- Scripts de performance com k6.

### 🔜 Evoluções recomendadas

- Migração da persistência JSON para Prisma + SQLite.
- Recuperação de senha.
- Perfil detalhado do herói.
- Histórico de XP por missão.
- Filtros por status e dificuldade.
- Ranking ou conquistas.
- Deploy automatizado por ambiente.

---

## 🧱 Critérios de sucesso do produto

| Critério | Indicador |
| --- | --- |
| Autenticação funcional | Usuário consegue registrar e fazer login |
| Fluxo de missão completo | Missão passa de pendente para em andamento e concluída |
| Progressão confiável | XP e nível são atualizados após conclusão |
| API documentada | Swagger disponível em `/api-docs` |
| Qualidade verificável | Testes API/E2E executáveis localmente |

