const express = require("express");


const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json());

//const db = require("./db/models");

const events = require('./controllers/events');

app.use('/', events);

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

