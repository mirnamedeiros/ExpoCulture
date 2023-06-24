const express = require("express");

const router = express.Router();

const db = require("./../db/models");

const upload = require("../db/config/multer");

router.get("/events", async (req, res) => {

    const events = await db.Events.findAll({
        attributes: ['id', 'name', 'date_event', 'path_img', 'description', 'external_link','contact_number','active'],
        order: [['id', 'ASC']]
    });

    if(events){
        return res.json({
            events,
        });
    }else{
        return res.status(400).json({
            mensagem: "Error: Não existe nenhum evento cadastrado",
        });
    }
});

router.post("/events", async (req, res) => {

    var dados = req.body;

    await db.Events.create(dados).then((dadosUsuario) => {
        return res.json({
            mensagem: "Evento cadastrado com sucesso!",
            dadosUsuario
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: "Error: Não foi possivel cadastrar o evento!",
        });
    });
});

router.post("/events/image",upload.single('image'), async (req, res) => {   
    try {
        const file = await req.file;

        return res.send(file.path);
    
    }catch(error){
        return res.status(500).json("Erro ao salvar a imagem: " + error);
    }
});

module.exports = router;