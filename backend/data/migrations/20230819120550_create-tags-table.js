exports.up = function (knex) {
    return knex.schema.createTable('tags', function (table) {
        table.integer('jid').unsigned().references('journal.jid').onDelete('CASCADE');
        table.integer('sid').unsigned().references('student.sid');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tags');
};
