# API e Swagger

## Visão geral

A API do **Forja de Heróis** é uma API REST em Node.js + Express. Ela expõe recursos de autenticação e missões, usando JSON como formato de entrada e saída.

---

## Swagger

Com o backend em execução, acesse:

```text
http://localhost:4000/api-docs
```

O Swagger concentra a documentação interativa das rotas, permitindo consultar payloads, respostas e autenticação.

---

## Autenticação

Rotas de missões exigem token JWT no cabeçalho:

```http
Authorization: Bearer <token>
```

O token é obtido no login:

```http
POST /auth/login
```

---

## Endpoints

### Registrar herói

```http
POST /auth/register
```

Payload:

```json
{
  "name": "Aisha",
  "email": "aisha@forja.io",
  "password": "Segura123"
}
```

Resposta esperada:

```json
{
  "id": "uuid",
  "name": "Aisha",
  "email": "aisha@forja.io",
  "xp": 0,
  "level": 1
}
```

---

### Login

```http
POST /auth/login
```

Payload:

```json
{
  "email": "aisha@forja.io",
  "password": "Segura123"
}
```

Resposta esperada:

```json
{
  "token": "jwt",
  "user": {
    "id": "uuid",
    "name": "Aisha",
    "email": "aisha@forja.io",
    "xp": 0,
    "level": 1
  }
}
```

---

### Listar missões

```http
GET /missions
```

Requer autenticação.

Resposta esperada:

```json
[
  {
    "id": "uuid",
    "title": "Treinar com espada de luz",
    "difficulty": "hard",
    "xp": 120,
    "status": "pending",
    "userId": "uuid"
  }
]
```

---

### Criar missão

```http
POST /missions
```

Requer autenticação.

Payload:

```json
{
  "title": "Treinar com espada de luz",
  "difficulty": "hard",
  "xp": 120
}
```

Resposta esperada:

```json
{
  "id": "uuid",
  "title": "Treinar com espada de luz",
  "difficulty": "hard",
  "xp": 120,
  "status": "pending",
  "userId": "uuid"
}
```

---

### Atualizar status

```http
PATCH /missions/{id}/status
```

Requer autenticação.

Payload:

```json
{
  "status": "in_progress"
}
```

Status aceitos:

| Status | Significado |
| --- | --- |
| `pending` | Missão criada, ainda não iniciada |
| `in_progress` | Missão em andamento |
| `completed` | Missão concluída |

Ao concluir uma missão, a resposta inclui a missão e o progresso atualizado do usuário:

```json
{
  "mission": {
    "id": "uuid",
    "title": "Treinar com espada de luz",
    "difficulty": "hard",
    "xp": 120,
    "status": "completed",
    "userId": "uuid"
  },
  "user": {
    "xp": 120,
    "level": 2
  }
}
```

---

### Excluir missão

```http
DELETE /missions/{id}
```

Requer autenticação.

Resposta esperada:

```json
{
  "message": "Missão excluída com sucesso."
}
```

---

## Códigos de resposta

| Código | Uso |
| --- | --- |
| `200` | Operação concluída com sucesso |
| `201` | Recurso criado |
| `400` | Dados inválidos ou transição inválida |
| `401` | Autenticação ausente, inválida ou credenciais incorretas |
| `404` | Missão não encontrada |
| `500` | Erro interno não tratado |

---

## Páginas relacionadas

- [Regras de Negócio](Regras-de-Negocio)
- [QA - Plano de Testes](QA-Plano-de-Testes)
- [Arquitetura da Aplicação](Arquitetura-da-Aplicacao)

