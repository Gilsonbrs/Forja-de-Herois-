# QA - Plano de Testes

## Objetivo

Organizar os cenários de teste do **Forja de Heróis** por funcionalidade, prioridade e resultado esperado.

---

## Matriz de cobertura

| ID | Funcionalidade | Tipo | Prioridade | Status |
| --- | --- | --- | --- | --- |
| CT-01 | Registrar usuário | API/E2E | Alta | Coberto |
| CT-02 | Login válido | API/E2E | Alta | Coberto |
| CT-03 | Login com e-mail inexistente | E2E | Média | Coberto |
| CT-04 | Login com senha incorreta | E2E | Média | Coberto |
| CT-05 | Criar missão | API/E2E | Alta | Coberto |
| CT-06 | Iniciar missão | API/E2E | Alta | Coberto |
| CT-07 | Concluir missão e ganhar XP | API/E2E | Alta | Coberto |
| CT-08 | Listar missões | API | Média | Coberto |
| CT-09 | Excluir missão | E2E | Média | Coberto |
| CT-10 | Logout | E2E | Média | Coberto |
| CT-11 | Token ausente em missões | API | Alta | Recomendado |
| CT-12 | XP inválido | API | Média | Recomendado |
| CT-13 | Concluir missão pendente | API | Alta | Recomendado |

---

## Autenticação

### CT-01 - Registrar usuário

| Campo | Descrição |
| --- | --- |
| Pré-condição | E-mail ainda não cadastrado |
| Ação | Enviar nome, e-mail e senha |
| Resultado esperado | Retornar `201`, dados do usuário e não retornar senha |

### CT-02 - Login válido

| Campo | Descrição |
| --- | --- |
| Pré-condição | Usuário cadastrado |
| Ação | Enviar e-mail e senha corretos |
| Resultado esperado | Retornar `200`, token JWT e dados do usuário |

### CT-03 - Login inválido

| Campo | Descrição |
| --- | --- |
| Pré-condição | Usuário inexistente ou senha incorreta |
| Ação | Tentar autenticar |
| Resultado esperado | Exibir erro e não acessar dashboard |

---

## Missões

### CT-05 - Criar missão

| Campo | Descrição |
| --- | --- |
| Pré-condição | Usuário autenticado |
| Ação | Enviar título, dificuldade e XP |
| Resultado esperado | Criar missão com status `pending` |

### CT-06 - Iniciar missão

| Campo | Descrição |
| --- | --- |
| Pré-condição | Missão criada |
| Ação | Atualizar status para `in_progress` |
| Resultado esperado | Missão atualizada |

### CT-07 - Concluir missão

| Campo | Descrição |
| --- | --- |
| Pré-condição | Missão em andamento |
| Ação | Atualizar status para `completed` |
| Resultado esperado | Missão concluída, XP somado e nível recalculado |

### CT-09 - Excluir missão

| Campo | Descrição |
| --- | --- |
| Pré-condição | Missão existente do usuário autenticado |
| Ação | Excluir missão |
| Resultado esperado | Mensagem de sucesso e missão removida da lista |

---

## Performance

| Cenário | Script | Objetivo |
| --- | --- | --- |
| Login | `backend/k6/login.js` | Medir estabilidade do endpoint de autenticação |
| Criar missão | `backend/k6/create_mission.js` | Medir estabilidade do fluxo autenticado |

---

## Regressões prioritárias

Antes de uma entrega, validar:

- Registro e login.
- Token sendo enviado pelo frontend.
- Criação de missão.
- Transição `pending` → `in_progress` → `completed`.
- Soma de XP apenas uma vez por missão concluída.
- Swagger acessível.
- Build do frontend.

---

## Checklist de execução

- [ ] Backend iniciado.
- [ ] Frontend iniciado.
- [ ] Banco local limpo ou em estado conhecido.
- [ ] Testes de API executados.
- [ ] Testes Cypress executados.
- [ ] Scripts k6 executados quando houver validação de performance.
- [ ] Resultados registrados na entrega.

