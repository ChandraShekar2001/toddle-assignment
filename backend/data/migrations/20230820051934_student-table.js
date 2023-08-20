exports.up = function (knex) {
    return knex.schema.createTable('student', function (table) {
        table.increments('studentId').primary();
        table.string('studentName').notNullable();
        table.string('studentPwd').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('student');
};