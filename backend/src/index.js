const app = require('./app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Forja de Heróis API rodando na porta ${PORT}`);
});
