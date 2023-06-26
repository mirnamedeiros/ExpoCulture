const express = require("express");

const router = express.Router();

const db = require("./../db/models");

const upload = require("../db/config/multer");

const { Op } = require('sequelize')

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

router.get("/events/:starterDate:endDate", async (req, res) => {

    const {starterDate} = req.params;
    const {endDate} = req.params;

    const starterDateObj = new Date(starterDate);
    const endDateObj = new Date(endDate);

    const events = await db.Events.findAll({
        attributes: ['id', 'name', 'date_event', 'path_img', 'description', 'external_link','contact_number','active'],
        order: [['id', 'ASC']],
        where: {
            date_event: {
                [Op.between]: [starterDateObj, endDateObj], 
            }
        }
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

router.get("/events/:id", async (req, res) => {
    
    const { id } = req.params;

    const event = await db.Events.findOne({
        attributes: ['id', 'name', 'date_event', 'path_img', 'description', 'external_link','contact_number','active'],
        where: { id },
    });

    if(event){
        return res.json(event.dataValues);
    }else {
        return res.status(400).json({
            mensagem: "Erro: Não existe nenhum evento com esse id no banco.",
        });
    }
});

router.post("/events", async (req, res) => {

    var dados = req.body;

    console.log(dados);

    await db.Events.create(dados).then((dadosUsuario) => {
        return res.json({
            mensagem: "Evento cadastrado com sucesso!",
            dadosUsuario
        });
    }).catch((error) => {
        console.log(error);
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


router.put("/events/:id", async (req, res) => {

    const { id } = req.params;

    await db.Events.update({active: true}, { where: { id }})
        .then(() => {
            return res.json({
                mensagem: "Evento atualizado com sucesso! ",
            });
        }).catch(() => {
            return res.status(400).json({
                mensagem: "Error: Não foi possivel atualizar esse evento!",
            });
        });
});

module.exports = router;