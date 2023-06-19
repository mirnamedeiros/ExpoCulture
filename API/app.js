const express = require("express");

const app = express();

app.use(express.json());

//const db = require("./db/models");

const events = require('./controllers/events');

app.use('/', events);

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

