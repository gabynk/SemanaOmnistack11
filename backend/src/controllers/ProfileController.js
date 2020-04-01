//responsável pelo perfil da entidade
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id) //os iguais
            .select('*');//selecionar eles

        return response.json(incidents);
    }
}
