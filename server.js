const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// API con json-server PRIMERO
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use('/api', middlewares);
app.use('/api', router);

// Servir archivos estáticos DESPUÉS de la API
app.use(express.static(path.join(__dirname)));

// Redirigir solo la raíz a login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
