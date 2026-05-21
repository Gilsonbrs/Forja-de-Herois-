# Regras de Negócio

## Usuários

| Regra | Descrição |
| --- | --- |
| RN-01 | Nome, e-mail e senha são obrigatórios para registro |
| RN-02 | Não é permitido cadastrar dois usuários com o mesmo e-mail |
| RN-03 | A senha deve ser armazenada com hash |
| RN-04 | Login exige e-mail e senha |
| RN-05 | Credenciais inválidas retornam erro de autenticação |
| RN-06 | Um novo usuário começa com `xp = 0` e `level = 1` |

---

## Missões

| Regra | Descrição |
| --- | --- |
| RN-07 | Missões pertencem a um único usuário |
| RN-08 | Rotas de missão exigem token JWT válido |
| RN-09 | Título, dificuldade e XP são obrigatórios |
| RN-10 | XP deve ser número maior que zero |
| RN-11 | Toda missão nasce com status `pending` |
| RN-12 | O usuário só pode listar, alterar ou excluir as próprias missões |

---

## Status de missão

| Status | Estado |
| --- | --- |
| `pending` | Criada e aguardando início |
| `in_progress` | Em execução |
| `completed` | Finalizada e elegível para XP |

### Regras de transição

| Origem | Destino | Permitido | Observação |
| --- | --- | --- | --- |
| `pending` | `in_progress` | Sim | Fluxo esperado para iniciar |
| `in_progress` | `completed` | Sim | Soma XP ao usuário |
| `pending` | `completed` | Não | A missão deve estar em andamento antes |
| `completed` | `completed` | Idempotente | Retorna a missão sem duplicar XP |

---

## XP e nível

O nível do usuário é calculado com base no XP total:

```js
level = Math.floor(xp / 100) + 1
```

Exemplos:

| XP total | Nível |
| --- | --- |
| 0 | 1 |
| 50 | 1 |
| 100 | 2 |
| 120 | 2 |
| 250 | 3 |

---

## Autorização

| Situação | Resultado |
| --- | --- |
| Token ausente | `401` |
| Token inválido | `401` |
| Usuário do token não existe | `401` |
| Missão pertence a outro usuário | Tratada como não encontrada |

>  Tratar missão de outro usuário como não encontrada evita exposição de existência de dados privados.

---

## Decisões atuais

| Decisão | Justificativa |
| --- | --- |
| JWT com validade de 8 horas | Sessão suficiente para uso local/demonstração |
| Persistência JSON | Simplicidade para execução local |
| XP configurável por missão | Permite missões com pesos diferentes |
| Dificuldade livre no backend | Frontend pode restringir opções, mas API ainda aceita texto |

---

## Regras candidatas para evolução

- Validar dificuldade em enum: `easy`, `medium`, `hard`.
- Impedir redução de status de `completed` para outro estado.
- Registrar histórico de conclusão.
- Adicionar data de criação e atualização nas entidades.
- Adicionar limite mínimo de senha.
- Normalizar e-mail antes do cadastro.

