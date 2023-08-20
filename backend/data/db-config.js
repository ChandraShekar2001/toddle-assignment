const knex = require("knex");
const config = require("../knexfile.js");

const db = knex(config.development);

function find(table) {
  return db(table);
}
function findByName(table, name) {
  return db(table).where({ teacher_name: name });
}
function findPassword(table, password){
  return db(table).where({ teacher_pwd:password });
}
function insert(table, post) {
  return db(table)
    .insert(post)
    .then((ids) => ({ id: ids[0] }));
}


module.exports = {
  find,
  findByName,
  insert,
  findPassword
};
