exports.up = function(knex) {
        return knex.schema.createTable('incidents', function (table){
            table.increments(); //automático 1, 2, 3..
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.decimal('value').notNullable();
            table.string('ong_id').notNullable();
            table.foreign('ong_id').references('id').inTable('ongs');
            //sempre que tiver conteúdo na anterior.. 
            //chave estrangeira
        });
      };
      
      exports.down = function(knex) {
        // apagar tabela
        return knex.schema.dropTable('incidents');
      };
    