const express = require('express');
const OngController = require('./controllers/OngControllers');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//o "post" não necessariamente precisa usar para criar e acessar o bdados
routes.post('/sessions', SessionController.create); //não acessa o bdados

routes.get('/ongs', OngController.index); //listar
routes.post('/ongs', OngController.create); //criar

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', IncidentController.delete); //deletar id específico

module.exports = routes; 
//exportar