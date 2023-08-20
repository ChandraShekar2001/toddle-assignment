exports.up = function (knex) {
    return knex.schema.createTable('teacher', function (table) {
        table.increments('tid').primary();
        table.string('teacher_name').notNullable();
        table.string('teacher_pwd');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('teacher');
};