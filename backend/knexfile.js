
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "mahmud.db.elephantsql.com",
      port: "5432", // Default PostgreSQL port
      user: "bnbaqqvc",
      password: "UoJflQ42F4InfooN-6Pyn4zm3xHHkhVW",
      database: "bnbaqqvc",
  },
    useNullAsDefault: true,

    migrations: {
      //Will create your migrations in the data folder automaticlly directory: '/data/migrations'
      directory: "./data/migrations",
    },
    //Will create your seeds in the data folder automaticly
    seeds: {
      directory: "./data/seeds",
    },
  },

};