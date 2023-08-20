exports.up = function (knex) {
    return knex.schema.createTable('teacher', function (table) {
        table.increments('teacherId').primary();
        table.string('teacherName').notNullable();
        table.string('teacherPwd').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('teacher');
};