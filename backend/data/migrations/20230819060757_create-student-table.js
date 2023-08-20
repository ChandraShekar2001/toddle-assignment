exports.up = function (knex) {
    return knex.schema.createTable('student', function (table) {
        table.increments('sid').primary();
        table.string('student_name').notNullable();
        table.string('student_pwd');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('student');
};