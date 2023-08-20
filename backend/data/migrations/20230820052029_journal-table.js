exports.up = function (knex) {
    return knex.schema.createTable('journal', function (table) {
        table.increments('journalId').primary();
        table.integer('teacherId').unsigned().references('teacher.teacherId');
        table.date('publishedAt').notNullable();
        table.text('description').notNullable();;
        table.text('attachmentLink').notNullable();//1 - image, 2 - pdf, 3 - video, 4- link
        table.text('attachmentType').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('journal');
};