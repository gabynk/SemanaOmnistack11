const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        //verificar se não há outro igual

        const { id } = request.body; // vem pelo o corpo

        const ong = await connection('ongs')
            .where('id', id)
            .select('name') // vai retornar apenas o nome no front-end
            .first();
            
        //se não achar/existir
        if(!ong) {
            return response.status(400).json({ error: 'No ONG found with this id'});
        } //erro 400 é que alguma coisa deu errado

        //se achar/existir
        return response.json(ong);
    }
}
