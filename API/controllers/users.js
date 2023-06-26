const express = require("express");

const router = express.Router();

const db = require("./../db/models");

const upload = require("../db/config/multer");

router.get("/users", async (req, res) => {

    const user = await db.Users.findAll();

    if(user){
        return res.json(user.dataValues);
    }else {
        return res.status(400).json({
            mensagem: "Erro: Não existe nenhum usuario com esse id no banco.",
        });
    }
});

router.post("/users/login", async (req, res) => {

    var dados = req.body;

    const user = await db.Users.findOne({
        attributes: ['id', 'login'],
        where: { login:dados.login, password:dados.password },
    });

    if(user){
        return res.json({
            mensagem: "Logado com sucesso",
            user: user.dataValues
        });
    }else {
        return res.status(400).json({
            mensagem: "Erro: Informe um login e senha validos",
        });
    }
});

router.post("/users", async (req, res) => {

    var dados = req.body;

    await db.Users.create(dados).then((dadosUsuario) => {
        return res.json({
            mensagem: "Usuario cadastrado com sucesso!",
            dadosUsuario
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: "Error: Não foi possivel cadastrar o usuario!",
        });
    });
});

module.exports = router;