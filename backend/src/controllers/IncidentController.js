// na metodologia mvc, de preferença, não conter mais do que 5 métodos
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query; 
        //query = ?
        // Ex: /Incidents?page=2

        const [count] = await connection('incidents').count();
        // [count], [] para pegar a primeira posição to array e não o array todo
        // [count]  == count[0]

        response.header('X-Total-Count', count['count(*)']);
        //o total geralmente retorna no cabeçalho
        //console.log(count);
        //para retornar o que tem no "count" no terminal

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //SQL - relacionar dados de duas tabelas
            .limit(5) //cada pág terá 5 casos
            .offset((page - 1) * 5)
            .select([ //sem o select especificando ele pode sobrepor alguns dados
                'incidents.*', // " * " são todos
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({id});
    },

    // a ong só pode deletar os ids referentes a ela
    async delete(request, response) {
        const { id } = request.params; //parametro da rota
        const ong_id = request.headers.authorization; //procurar o id da ong que quer deletar

        //procurar o id específico que quer deletar
        const incident = await connection('incidents')
            .where('id', id) //pegar apenas os que são iguais
            .select('ong_id') //pegar apenas os id
            .first(); //pegar o primeiro (não retorna o array, apenas o resultado)

        if(incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted'});
        } // erro 401 é não autorizado

        //apagar os ids que forem iguais
        await connection('incidents').where('id', id).delete();

        //retornar que teve sucesso mas não tem conteúdo (send() retornar sem corpo)
        return response.status(204).send();
    }
};
