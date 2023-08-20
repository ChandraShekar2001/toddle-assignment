exports.up = function (knex) {
    return knex.schema.createTable('tags', function (table) {
        table.integer('journalId').unsigned().references('journal.journalId').onDelete('CASCADE');
        table.integer('studentId').unsigned().references('student.studentId');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tags');
};
