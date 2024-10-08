require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // Importa el paquete cors
const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();

app.use(express.json());
app.use(helmet());

// Configura CORS para permitir cualquier origen
app.use(cors({
  origin: '*', // Permite cualquier origen
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

module.exports = app;
