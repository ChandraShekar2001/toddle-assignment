
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teacher').del()
  await knex('teacher').insert([
    {tid: 1, teacher_name:'Chandra shekar', teacher_pwd: 'chandu'},
  ]);
};
