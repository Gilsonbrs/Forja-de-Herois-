require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
const authRoutes = require('./routes/authRoutes');
const missionRoutes = require('./routes/missionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/missions', missionRoutes);

app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
  next();
});

module.exports = app;
