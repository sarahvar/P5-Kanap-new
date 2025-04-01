const http = require('http');
const app = require('./app');

// Remplacer l'écoute sur un port par une fonction qui répond à la requête de Vercel
module.exports = (req, res) => {
  const server = http.createServer(app);

  // Traiter les erreurs
  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof server.address() === 'string' ? 'pipe ' + server.address() : 'port ' + process.env.PORT;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  // Fonction de démarrage
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });

  // Gérer la requête et la réponse
  server.emit('request', req, res);
};
