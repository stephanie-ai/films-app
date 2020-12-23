const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const filmRoutes = require('./controllers/films');
const actorRoutes = require('./controllers/actors');

server.use('/films', filmRoutes);
server.use('/actors', actorRoutes);

const port = process.env.PORT || 3000;

server.get('/', (req, res) => res.send('Hello World'));

server.listen(port, () => console.log(`Express now departing from port ${port}`));