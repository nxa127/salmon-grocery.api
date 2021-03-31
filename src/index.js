const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || '3000';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/_test';

const main = async () => {
  const app = express();
  app.set('trust proxy', true);
  app.use(cors());
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log('[DB] Connected', MONGO_URL);

  const server = http.createServer(app);

  const api = express.Router();

  api.get('/generate_204', (req, res) => {
    res.sendStatus(204);
  });

  app.use('/api', api);

  server.listen(PORT, () => {
    console.log('[APP] Listenning', PORT);
  });
};

main();
