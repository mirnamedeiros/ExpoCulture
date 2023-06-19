const express = require("express");

const router = express.Router();

const db = require("./../db/models");


router.get("/events", async (req, res) => {

    const { page } = req.query;

    const limit = 10;

    var lastPage = 1;

    const countEvent = await db.Events.count();

    if(countEvent !== 0){
        lastPage = Math.ceil(countEvent / limit);

    }else {
        return res.status(400).json({
            mensagem: "Error: Não existe nenhum evento cadastrado",
        });
    }

    const events = await db.Events.findAll({
        attributes: ['id', 'name', 'date_event', 'path_img', 'description', 'external_link','contact_number','active'],
        order: [['id', 'ASC']],
        offset: Number((page * limit) - limit),
        limit: limit
    });

    if(events){

        var pagination = {
            path: '/events',
            page,
            prev_page_url: Number(page) - 1 >= 1 ? Number(page) - 1 : false,
            next_page_url: Number(page) + 1 >= lastPage ? false : Number(page) + 1,
            lastPage,
            total: countEvent
        }

        return res.json({
            events,
            pagination
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

module.exports = router;