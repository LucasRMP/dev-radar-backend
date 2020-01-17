const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
require('dotenv').config();

const { setupWebSocket } = require('./websocket');
const routes = require('./routes');

const app = express();

const server = http.Server(app);
setupWebSocket(server);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-auipm.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);
