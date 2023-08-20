exports.up = function (knex) {
    return knex.schema.createTable('journal', function (table) {
        table.increments('jid').primary();
        table.integer('tid').unsigned().references('teacher.tid');
        table.date('published_at').notNullable();
        table.string('attachment_type').notNullable();//0 - image, 2 - pdf, 3 - video, 4 - link
        table.string('attachment');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('journal');
};