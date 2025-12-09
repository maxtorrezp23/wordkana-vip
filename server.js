const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// API con json-server
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use('/api', middlewares);
app.use('/api', router);

// Redirigir todas las rutas HTML
app.get('*', (req, res) => {
  if (req.path.endsWith('.html') || req.path === '/') {
    res.sendFile(path.join(__dirname, req.path === '/' ? 'login.html' : req.path));
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
