exports.up = function(knex) {
      // criar tabela (cadastro)

      return knex.schema.createTable('ongs', function (table){
          table.string('id').primary();
          // id aleatório
          table.string('name').notNullable();
          table.string('email').notNullable();
          table.string('whatsapp').notNullable();
          table.string('city').notNullable();
          table.string('uf', 2).notNullable();
      });
    };
    
    exports.down = function(knex) {
      // apagar tabela
      return knex.schema.dropTable('ongs');
    };
    