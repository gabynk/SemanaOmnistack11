const express = require('express');
const cors = require('cors');
const routes = require('./routes');
//importação

const app = express();

app.use(cors());

app.use(express.json()); 
// para entender que oq está no insonia é json

app.use(routes);
app.listen(3333); //rota

// '/' é o recurso da rota

/**
 * métodos HTTP:
 * -GET: buscar uma informação do backend
 * -POST: criar uma informação
 * -PUT: alterar uma informação
 * -DELETE: deletar uma informação
 */

/**
 * Tipos de parâmetros
 * Query Params: parâmetros nomeados na rota após "?"(filtros, paginaçãp)
 *               (caso tiver mais de um, separar com "&")
 * Route Params: parâmetros utilizados para identificar recursos
 * Request Body: corpo da requisição, utilizado para criar ou alterar recursos
 *               tanto no .js como no insomnia deve estar com métodos iguais?
 */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where() 
 */

/**
 * para mostrar no console/terminal
 * console.log("olá");
*/
