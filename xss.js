// Código vulnerable a XSS
const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  const userQuery = req.query.q;
  res.send(`<h1>Resultados para: ${userQuery}</h1>`);
});

app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'));