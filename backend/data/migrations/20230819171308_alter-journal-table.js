exports.up = function(knex) {
    return knex.schema.table('journal', function(table) {
      table.string('description');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('journal', function(table) {
      table.dropColumn('description');
    });
  };