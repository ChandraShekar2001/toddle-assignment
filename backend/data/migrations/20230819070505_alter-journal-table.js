exports.up = function(knex) {
    return knex.schema.alterTable('journal', function(table) {
      // Change the data type of the column
      table.text('attachment').alter();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('journal', function(table) {
      // Revert the data type change if needed
      table.string('attachment').alter();
    });
  };
  