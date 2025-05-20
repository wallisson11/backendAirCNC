//index()
//show() lista 1 sessão
//store() cria 1 sessão
//update() atualiza 1 sessão
//destroy() deleta 1 sessão

const express = require('express');
const routes = express.Router();

routes.post('/sessao', Sessao.controller.store);  